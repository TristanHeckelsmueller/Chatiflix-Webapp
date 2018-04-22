var socket = io();

function scrollToBottom() {

    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();


    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect', function () {
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('updateUserList', function (user) {
     let ol = $('<ol></ol>');
     user.forEach(function (user) {
         ol.append($('<li></li>').text(user));
     });
     $('#users').html(ol);
});



socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('k:mm');
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);

    scrollToBottom()


    //  console.log('newMessage', message);
    //  var li = jQuery('<li></li>');
    //  li.text(`${message.from} ${formattedTime} Uhr: ${message.text}`);
    //
    //  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function () {
    let formattedTime = moment(message.createdAt).format('k:mm');
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    $('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (navigator.geolocation)  {
        return alert('Geolocation not supported by your Browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});