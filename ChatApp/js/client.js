const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messagrinput = document.getElementById("messageinput");
const messagecontainer = document.querySelector(".container"); // when ever message has been send it have to inside the container for that we use the query selctior command.

var audio = new Audio("message_sound.mp3");

const append = (message,position)=>{ // this is appand function which take two arrgument message and the postion which may be left or right and message is the name of the funtion.
    const messageElement = document.createElement('div'); // here we are creating the element which has to display inside the container.
    messageElement.innerText = message; // here we are sending message as text inside messageElement.
    messageElement.classList.add('message'); // here we are adding class
    messageElement.classList.add(position);   // here we are adding class
    messagecontainer.append(messageElement); // here we are appading
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault(); // it will prevent from reloding the page whenever form is submited.
    const message= messagrinput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message); // here we are telling the server that i am sending the message that's why we pass two arrgument send and message which we have to send.
    messagrinput.value="";  // here we are define that when message is sended by the user than message box should be empty there is no text is left.
});

const name = prompt("Enter your name to join");
socket.emit('New-User-Joined', name);

socket.on("user-joined", name=>{
    append(`${name} joined the chat`, 'left');  // here we want that whenever user join the chat message  display inside the container that this user join the chat that's why we call appand functions to to appand the message inside the container.
});

socket.on('receive' , data=>{
    append(`${data.name}: ${data.message}`, 'left');  // here we make a receive function and accept and object which is given by send instance of server and exterat name of the user and message and display it on the left position of the container. 
});
socket.on('left' , name=>{
    append(`${name}: left the chat`, 'left');   
});




