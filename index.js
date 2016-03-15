var App = require('./lib/app.js')

if (window && !window.ScreenCloudApp) {
  window.ScreenCloudApp = App
}

module.exports = App
