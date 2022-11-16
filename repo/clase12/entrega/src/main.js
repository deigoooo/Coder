const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

//configuracion
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Variables
const PORT = 8080;
const publicRoot = './public';
const messages = [
    { author: "Juan", text: "Hola! que tal?"},
    { author: "Pedro", text: "Muy bien! vos?"},
    { author: "Ana", text: "Genial!!!"},
];

//Carpeta publica visible
app.use(express.static(publicRoot));

//ServerUP
httpServer.listen (PORT, function(){
    console.log('Servidor corriendo en http://localhost:8080');
})

//Configuracion de sockets
io.on('connection', function(socket){
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
});

