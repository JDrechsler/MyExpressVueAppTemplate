var socket = io()

var vueVars = {
	status: "works",
	answer: ''
}

var vueMethods = {
	getServerAnswer() {
		socket.emit('request-answer')
	}
}

var vueWatchers = {

}

var vueComputed = {

}

new Vue({
	el: '#vue-app',
	data: vueVars,
	methods: vueMethods,
	computed: vueComputed,
	watch: vueWatchers
})

socket.on('response-answer', function (answer) {
	vueVars.answer = answer
})

document.ondragover = document.ondrop = (ev) => {
	ev.preventDefault();
}
document.body.ondrop = (ev) => {
	ev.preventDefault();
}
