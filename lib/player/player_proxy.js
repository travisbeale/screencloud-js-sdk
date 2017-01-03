var util = require('util')
var EventEmitter = require('events').EventEmitter
var Channel = require('screencloud-js-channel')
var PREFIX = '[app/player_proxy] '
var DEBUG = process.env.DEBUG || false

function PlayerProxy (opts) {
  EventEmitter.call(this)
  opts = opts || {}
  this.app = opts.app
}

util.inherits(PlayerProxy, EventEmitter)

PlayerProxy.prototype.init = function () {
  DEBUG && console.log(PREFIX + 'init')
  var self = this

  if (window.parent === window) {
    return Promise.reject(new Error('not running inside screencloud player'))
  // REVIEW: should we have a disconnected mode with mock api ?
  }

  this.channel = new Channel({
    name: 'app => player',
    output: window.parent,
    input: window,
    handler: this.app,
    timeout: 5000
  })

  this.channel.connect().catch(function (err) {
    // retry a second time..
    console.log(PREFIX + 'error calling channel connect', err)
    self.channel.connect()
  })

  return new Promise(function (resolve, reject) {
    if (window.parent === window) {
      return reject(new Error('not running inside screencloud player'))
    // REVIEW: should we have a disconnected mode with mock api ?
    }
    self.channel.on('connected', function (id) {
      DEBUG && console.log(PREFIX + 'connected')
      resolve()
    })
  // TODO: add timeout for reject
  })
}

PlayerProxy.prototype.getPlayerInfo = function () {
  return this.channel.call('getPlayerInfo')
}

PlayerProxy.prototype.getDeviceInfo = function () {
  return this.channel.call('getDeviceInfo')
}

PlayerProxy.prototype.getAppData = function () {
  return this.channel.call('getAppData')
}

PlayerProxy.prototype.getPairingCode = function () {
  // NOTE: only available in pairing mode
  return this.channel.call('getPairingCode')
}

PlayerProxy.prototype.getMediaCacheURL = function () {
  return this.channel.call('getMediaCacheURL')
}

PlayerProxy.prototype.setAppInfo = function (info) {
  this.channel.call('setAppInfo', info)
}

module.exports = PlayerProxy
