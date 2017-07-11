var PMI = require('postmessage-interface')
var mockPlayerAPI = {
  getPlayerInfo: function () {
    return {
      id: 'mockplayer',
      env: 'test'
    }
  },
  getDeviceInfo: function () {
    return {
      platform: 'testing'
    }
  },
  getPairingCode: function () {
    return 'ABCD1234'
  },
  getMediaCacheURL: function () {
    return 'http://localhost:8700'
  }
}

var mockPlayerPMI = new PMI.ExposedInterface(mockPlayerAPI, {
  window: {
    addEventListener: function (type, handler) {}
  }
})

function mockWindowBuilder (receiveCallback) {
  var scope = {}
  var window = {
    postMessage: function (message, origin) {
      var event = new Event('message')
      event.data = message
      event.origin = origin
      event.source = {
        postMessage: function (message, origin) {
          var event = new Event('message')
          event.data = message
          event.origin = origin
          event.source = scope.window
          receiveCallback(event)
        }
      }
      mockPlayerPMI._receive(event)
    }
  }
  scope.window = window
  return window
}

module.exports = mockWindowBuilder
