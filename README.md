## ScreenCloud App SDK

```
var ScreenCloudApp = require('screencloud-app')

var app = new ScreenCloudApp({
	name: 'My Custom App'
})

// uses async promise based api 

app.init().then(function(){

	app.getPlayerInfo().then(function(info){
		console.log('player info', info)
	})

	app.getData().then(function(data){
		console.log('app data', data)
	})

	app.getMediaCacheURL().then(function(url){
		console.log('media cache url', url)
	})

	app.updateInfo({
		playing: "something cool"
	})
})

```