class ChatEngine{
    // this class is for the cerating the connection
    // 
    constructor(chatBoxId, userEmail){
        // console.log("we are here");
        // console.log(`${chatBoxId}`);
        // console.log($(`#${chatBoxId}`));
    
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:9000'); // io is a global variable that is available as soon as I included cdn file on home.ejs
        // io.connect fires an event called connection (chat_sockets line )
        if (this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
    let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
// this function will emit or send the request to the server to join the room
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'iConnect'
            });
// each user will recieve the message that  a user is joined with the data
            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })

// please note that ..emit means sending the request and on means recieving the message (or request)
        });
       // CHANGE :: send a message on clicking the send message button
       $('#send-message').click(function(){
        let msg = $('#chat-message-input').val();

        if (msg != ''){
            self.socket.emit('send_message', {
                message: msg,
                user_email: self.userEmail,
                chatroom: 'iConnect'
            });
        }
    });

    self.socket.on('receive_message', function(data){
        console.log('message received', data.message);


        let newMessage = $('<li>');

        let messageType = 'other-message';

        if (data.user_email == self.userEmail){
            messageType = 'self-message';
        }

        newMessage.append($('<span>', {
            'html': data.message
        }));

        newMessage.append($('<sub>', {
            'html': data.user_email
        }));

        newMessage.addClass(messageType);

        $('#chat-messages-list').append(newMessage);
    })
}
}