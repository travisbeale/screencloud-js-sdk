window.SKIP_PLAYER_WINDOW_CHECK = true

var ScreenCloudPlayer = require('../index.js')
var mockWindowBuilder = require('./mock_player_window.js')

describe('app sdk', function () {
  it('should be exposed on window', function () {
    expect(window.ScreenCloudAPI).toBeDefined()
  })
  it('should have way to get player info', function () {
    var api = new ScreenCloudAPI({
      connectTimeout: 1000
    })
    var mockWindow = mockWindowBuilder(function (event) {
      //console.log('got event', event)
      window.dispatchEvent(event)
    })
    return api.connect(mockWindow).then(() => {
      console.log('connected!')
      return Promise.resolve().then(() => {
        return api.getPlayerInfo()
      }).then((playerInfo) => {
        expect(playerInfo).toBeDefined()
        expect(playerInfo.id).toBe('mockplayer')
        return api.getDeviceInfo()
      }).then((deviceInfo) => {
        expect(deviceInfo).toBeDefined()
      })
    })
  })
})
