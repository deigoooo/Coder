import express from 'express';
//const { Server: HttpServer } = require('http');
//const { Server: IOServer } = require('socket.io');

//importamos las rutas
import { rutaProducto } from './routes/productos.js';
import { rutaCarrito } from './routes/carrito.js';

const app = express();

//implementacion port & carpeta publica
const port = process.env.PORT || 8080;
const publicRoot = './public';

//carpeta publica visible
app.use(express.static(publicRoot));

//uso de json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//implementamos las rutas
app.use('/api/productos', rutaProducto);
app.use('/api/carrito', rutaCarrito);

//inicializacion sockets
//const httpServer = new HttpServer(app);
//const io = new IOServer(httpServer);

//inicializo el server
const servidor = app.listen(port, () => {
    console.log(`Servidor escuchando: ${servidor.address().port}`);
  });
  
  servidor.on('error', error => console.log(`Error: ${error}`));


