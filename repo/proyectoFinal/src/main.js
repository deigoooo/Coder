const express = require('express');
const moment = require('moment');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();

//declaracion de variables
const port= 8080;
const publicRoot = './public';

//uso de json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//inicializacion sockets
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//carpeta publica visible
aplicacion.use(express.static(publicRoot));

//endpoints
app.get('/', (peticion, respuesta) => {
    
  });

//inicializo el server
const servidor = httpServer.listen(port, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`);
  });
  
  servidor.on('error', error => console.log(`Error: ${error}`));

//sockets
