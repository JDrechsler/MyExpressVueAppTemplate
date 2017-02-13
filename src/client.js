var socket = io()

var vueVars = {
    status: "works"
}

var vueMethods = {

}

var vueWatchers = {

}

var vueComputed = {

}


document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: '#app',
        data: vueVars,
        methods: vueMethods,
        computed: vueComputed,
        watch: vueWatchers
    })

    console.log('Client ist ready')
    socket.emit('halloVonClient')
    socket.on('halloVonServer', function(message) {
        console.log(message)
    })

    document.ondragover = document.ondrop = (ev) => {
        ev.preventDefault();
    }
    document.body.ondrop = (ev) => {
        ev.preventDefault();
    }
})
