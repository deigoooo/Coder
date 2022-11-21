const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

//importamos las rutas
import { rutaProducto } from './routes/productos.js';
import { rutaCarrito } from './routes/carrito.js';

const app = express();

//implementacion port & carpeta publica
const port = process.env.PORT || 8080;
const publicRoot = './public';

//implementamos las rutas
app.use('/api/producto', rutaProducto);
app.use('/api/carrito', rutaCarrito);

//uso de json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware
app.use((peticion, respuesta, next) => {
    const key = peticion.headers.key;
    if(key == 1234){
      next();//Autorizar ejecutar lo siguiente
    }
    respuesta.status(403).send('Acceso denegado!');
  });

//inicializacion sockets
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//carpeta publica visible
aplicacion.use(express.static(publicRoot));

//inicializo el server
const servidor = app.listen(port, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`);
  });
  
  servidor.on('error', error => console.log(`Error: ${error}`));


