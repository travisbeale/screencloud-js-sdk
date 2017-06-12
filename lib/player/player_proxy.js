var util = require('util')
// var EventEmitter = require('events').EventEmitter
var PostMessageInterface = require('postmessage-interface')
var PREFIX = '[app/player_proxy] '
var DEBUG = process.env.DEBUG || false

function PlayerProxy (opts) {
  // EventEmitter.call(this)
  opts = opts || {}
  // opts.output = opts.output || window.parent
  this.opts = opts
  this.app = opts.app
}

// util.inherits(PlayerProxy, EventEmitter)

PlayerProxy.prototype.connect = function (target) {
  DEBUG && console.log(PREFIX + 'connect')
  var self = this

  // if (window.parent === window) {
  //   return Promise.reject(new Error('not running inside screencloud player'))
  // // REVIEW: should we have a disconnected mode with mock api ?
  // }

  this.pmi = new PostMessageInterface({
    // id: 'app => player',
    api: this.app,
    connectTimeout: this.opts.connectTimeout || 10000
  })

  console.log('calling connect', target)
  return this.pmi.connect(target).then(function (api) {
    console.log('api', api)
    self.api = api
  })
}

PlayerProxy.prototype.getPlayerInfo = function () {
  console.log('getPlayerInfo !!!', this.api)
  return this.api.call('getPlayerInfo', [])
}

PlayerProxy.prototype.getDeviceInfo = function () {
  return this.api.call('getDeviceInfo')
}

PlayerProxy.prototype.getAppData = function () {
  return this.api.call('getAppData')
}

PlayerProxy.prototype.getPairingCode = function () {
  // NOTE: only available in pairing mode
  return this.api.call('getPairingCode')
}

PlayerProxy.prototype.getMediaCacheURL = function () {
  return this.api.call('getMediaCacheURL')
}

PlayerProxy.prototype.setAppInfo = function (info) {
  this.api.call('setAppInfo', info)
}

module.exports = PlayerProxy
