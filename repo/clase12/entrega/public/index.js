/* const socket = io.connect();
socket.on('message', data =>{
    console.log(data);
}) */

const socket = io();

socket.on('message', data => {
    console.log(data);
})