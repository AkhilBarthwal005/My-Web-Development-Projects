//This is my node server which will handel Socket io connections
const io = require('socket.io')(8000)  // 8000 is port number in which we require socket.io connection

const users = {};  // it is like an array when ever new user join the chat the name of the user will be stored here with socket-id.

io.on('connection',socket=>{ // this will handel connection of all the user.
    socket.on('New-User-Joined',name=>{ // this will handel connection of paticular user and when ever a New-User-Joind the chat the even New-User-Joind call the call back function name and the name of the user will be store inside the const users={} and messsage will be display to the other memabers of the chat.
    // console.log("new user",name);
    users[socket.id]=name;  // it will add name of the new user inside users with paticular socket id.
    socket.broadcast.emit('user-joined',name);  // it will display the event message to the other user that this name of person join the chat except the new user itself.
    });

    socket.on('send',message=>{  // this is send event and it will be call when user send the message.
        socket.broadcast.emit('receive',{message : message, name : users[socket.id]}); // whenever user send the message to other users then the receive event will be call in clinet side in which other user can se that this name of person send this message to them.
    });

    socket.on('disconnect',message=>{  // this is send event and it will be call when user left the chat.
        socket.broadcast.emit('left',users[socket.id]); 
        delete users[socket.id]; // when user left the chat it will dissconet it
    });
});