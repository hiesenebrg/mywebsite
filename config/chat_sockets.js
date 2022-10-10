module.exports.chatSockets =function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors:{
            origin:'http://localhost:8000',
            methods: ['GET','POST']
        }
    });

    
    

    io.on('connection', function(socket){
        console.log('new connection  recieved' , socket.id);
            io.on('disconnect' , function(){
                    console.log('socket disconnected..!');
        });
// this act as a server side where this function collected the request and print joijning request recorded and then connect the request to the chat room
// and then send (or emit) user joined to all the user
        socket.on('join_room', function(data ){
            console.log('joining request rec.' , data);

            socket.join(data.chatroom);
            // this will emit the data to the chat engine
        io.in(data.chatroom).emit('user_joined', data);
            });
            //  CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
    
}