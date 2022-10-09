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

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'iConnect'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });
    

    } 


    
}