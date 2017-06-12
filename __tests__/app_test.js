var ScreenCloudApp = require('../index.js')
var MockPlayerWindow = require('./mock_player_window.js')

describe('app sdk', function () {
  it('should be exposed on window', function () {
    expect(window.ScreenCloudApp).toBeDefined()
  })
  it('should have way to get player info', function () {
    // window.parent = mockPlayerPMI.window
    // console.log(window.parent)
    var app = new ScreenCloudApp({
      connectTimeout: 1000
    })
    return app.connect(MockPlayerWindow).then(() => {
      console.log('connected!')
      return app.getPlayerInfo().then((info) => {
        expect(info).toBeDefined()
      })
    })
  })
})
