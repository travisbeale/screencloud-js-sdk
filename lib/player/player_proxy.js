var util = require('util')
var PMI = require('postmessage-interface')
var PREFIX = '[app/player_proxy] '
var DEBUG = process.env.DEBUG || false

function PlayerProxy(opts) {
  opts = opts || {}
  this.opts = opts
  this.app = opts.app
}

PlayerProxy.prototype.connect = function (target) {
  DEBUG && console.log(PREFIX + 'connect')

  if (window === target && window.SKIP_PLAYER_WINDOW_CHECK !== true) {
    return Promise.reject(new Error('Not running inside player'))
  }
  var self = this

  var remote = new PMI.RemoteInterface({
    // id: 'app => player',
    connectTimeout: this.opts.connectTimeout || 10000
  })

  // console.log('calling connect', target)
  return remote.connect(target).then(function (api) {
    // console.log('api', api)
    self.api = api
    return self
  })
}

PlayerProxy.prototype.getPlayerInfo = function () {
  return this.api.call('getPlayerInfo', [])
}

PlayerProxy.prototype.getDeviceInfo = function () {
  return this.api.call('getDeviceInfo')
}

PlayerProxy.prototype.getAppData = function () {
  return this.api.call('getAppData')
}

PlayerProxy.prototype.getPairingCode = function () {
  return this.api.call('getPairingCode')
}

PlayerProxy.prototype.getMediaCacheURL = function () {
  return this.api.call('getMediaCacheURL')
}

PlayerProxy.prototype.getServerTimeOffset = function () {
  return this.api.call('getServerTimeOffset')
}

PlayerProxy.prototype.setAppInfo = function (info) {
  this.api.call('setAppInfo', info)
}

PlayerProxy.prototype.getCachedURL = function (url) {
  return this.api.call('getCachedURL', url)
}

PlayerProxy.prototype.addToCache = function (url) {
  return this.api.call('addToCache', url)
}

PlayerProxy.prototype.removeFromCache = function (url) {
  return this.api.call('removeFromCache', url)
}

PlayerProxy.prototype.getCachedURLOrAddToCache = function (url) {
  return this.api.call('getCachedURLOrAddToCache', url)
}

module.exports = PlayerProxy