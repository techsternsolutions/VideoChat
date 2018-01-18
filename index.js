//FOR CHROME
//navigator.webkitGetUserMedia({ video:true, audio:true }, function(stream){
//FOR MOZILLA	
navigator.mozGetUserMedia({ video:true, audio:true }, function(stream){

	var Peer = require('simple-peer')
	var peer = new Peer({
		initiator: location.hash === '#init',
		trickle: false,
		stream:stream
	})

	peer.on('signal', function(data){
		document.getElementById('yourId').value = JSON.stringify(data)
	})

	//TO CONNECT THROUGH THEIR RESPECTIVE ID
	document.getElementById('connect').addEventListener('click', function(){
		var otherId = JSON.parse(document.getElementById('otherId').value)
		peer.signal(otherId)
	})

	
	//TO SEND THE TEXT MESSAGE
	document.getElementById('send').addEventListener('click', function(){
		var yourMessage = document.getElementById('yourMessage').value
		peer.send(yourMessage)
		document.getElementById('yourMessage').value='';
	})

	//TO DISPLAY THE TEXT MESSAGE
	peer.on('data', function(data){
		document.getElementById('messages').textContent += data + '\n'
	})

	//TO PLAY AUDIO-VIDEO STREAM
	peer.on('stream', function(stream){
		//FOR VIDEO
		var video = document.createElement('video')
		document.body.appendChild(video)
		
		video.src = window.URL.createObjectURL(stream)
		video.play()
		
		//FOR AUDIO
		var audioContext = new AudioContext()
		var audioStream  = audioContext.createMediaStreamSource(stream)
		audioStream.connect(audioContext.destination)
	})

}, function(err){
	console.error(err)
})