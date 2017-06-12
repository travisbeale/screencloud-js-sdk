var util = require('util')
var EventEmitter = require('events').EventEmitter
var PlayerProxy = require('./player/player_proxy.js')
var merge = require('merge')
var PREFIX = '[app] '
var DEBUG = process.env.DEBUG || false

function App (opts) {
  EventEmitter.call(this)
  opts = opts || {}
  this.opts = opts
  this.info = opts.info || {}
  this.player = new PlayerProxy({
    app: this,
    connectTimeout: this.opts.connectTimeout
  })
}

util.inherits(App, EventEmitter)

App.prototype.connect = function (target) {
  var self = this
  DEBUG && console.log(PREFIX + 'init', this)
  return this.player.connect(target)
}

// TODO - add events

App.prototype.getPlayerInfo = function () {
  return this.player.getPlayerInfo()
}

App.prototype.getDeviceInfo = function () {
  return this.player.getDeviceInfo()
}

App.prototype.getAppData = function () {
  return this.player.getAppData()
}

App.prototype.getMediaCacheURL = function () {
  return this.player.getMediaCacheURL()
}

App.prototype.setAppInfo = function (info) {
  this.info = info
  return this.player.setAppInfo(info)
}

App.prototype.getPairingCode = function () {
  return this.player.getPairingCode()
}

module.exports = App
