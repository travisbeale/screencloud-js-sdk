var util = require('util')
var EventEmitter = require('events').EventEmitter
var PlayerProxy = require('./player/player_proxy.js')
var merge = require('merge')
var PREFIX = '[app] '
var DEBUG = DEBUG || true

function App (opts) {
  EventEmitter.call(this)
  this.opts = opts
  this.info = opts.info || {}
  this.player = new PlayerProxy({
    app: this
  })
}

util.inherits(App, EventEmitter)

App.prototype.init = function () {
  var self = this
  DEBUG && console.log(PREFIX + 'init', this)
  return this.player.init().then(function () {
    // after connect we pass along info
    return self.player.setAppInfo(self.info)
  })
}

// TODO - add events

App.prototype.getPlayerInfo = function () {
  return this.player.getPlayerInfo()
}

App.prototype.getData = function () {
  return this.player.getAppData()
}

App.prototype.getMediaCacheURL = function () {
  return this.player.getMediaCacheURL()
}

App.prototype.setInfo = function (info) {
  this.info = info
  return this.player.setAppInfo(info)
}

App.prototype.updateInfo = function (info) {
  this.info = merge(this.info, info)
  return this.player.updateAppInfo(this.info)
}

App.prototype.getPairingCode = function () {
  return this.player.getPairingCode()
}

module.exports = App
