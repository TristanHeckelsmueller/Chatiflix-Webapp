var socket = io();

socket.on('connect', function () {
    console.log('Connected to Server');

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yeah that works for me'
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', function (message) {
     console.log('newMessage', message);
});