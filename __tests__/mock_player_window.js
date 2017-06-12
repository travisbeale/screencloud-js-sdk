var PostMessageInterface = require('postmessage-interface')
var mockPlayerAPI = {
  getPlayerInfo: function () {
    return {
      id: 'mockplayer',
      env: 'test'
    }
  },
  getPairingCode: function () {
    return 'ABCD1234'
  },
  getMediaCacheURL: function () {
    return 'http://localhost:8700'
  }
}

var mockPlayerPMI = new PostMessageInterface({
  api: mockPlayerAPI,
  window: {
    addEventListener: function () {
    }
  }
})

mockPlayerPMI.window.postMessage = function (message, origin) {
  mockPlayerPMI.receive({
    data: message,
    source: window,
    origin: origin
  })
}

module.exports = mockPlayerPMI.window
