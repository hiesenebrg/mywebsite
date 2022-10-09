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
    });
    
}