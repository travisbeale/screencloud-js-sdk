var util = require('util')
var EventEmitter = require('events').EventEmitter
var Channel = require('screencloud-js-channel')
var PREFIX = '[app/player_proxy] '
var DEBUG = DEBUG || true

function PlayerProxy (opts) {
  EventEmitter.call(this)
  opts = opts || {}
  this.app = opts.app
}

util.inherits(PlayerProxy, EventEmitter)

PlayerProxy.prototype.init = function () {
  DEBUG && console.log(PREFIX + 'init')
  var self = this
  this.channel = new Channel({
    name: 'app => player',
    output: window.parent,
    input: window,
    handler: this.app,
    timeout: 5000
  })
  if (window.parent !== window) {
    this.channel.connect()
  }
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

PlayerProxy.prototype.getInfo = function () {
  return this.channel.call('getInfo')
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
