var PlayerProxy = require('./lib/player/player_proxy.js')

if (window && !window.ScreenCloudAPI) {
  window.ScreenCloudAPI = PlayerProxy
}

module.exports = PlayerProxy
