const express = require('express');
const moment = require('moment');
const aplicacion = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Contenedor = require("./contenedor/contenedorFs");

const port = 8080;
const publicRoot = "./public";

const httpServer = new HttpServer(aplicacion);
const io = new IOServer(httpServer);

//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

//Hacemos la carpeta public visible
aplicacion.use(express.static(publicRoot));

const productos = new Contenedor("./src/db/productos.txt");
const messages = new Contenedor("./src/db/mensajes.txt");

//Endpoint
aplicacion.get("/", (peticion, respuesta) => {
  respuesta.send("index.html", { root: publicRoot });
});

//Servidor
const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on("error", (error) => console.log(`Error: ${error}`));

//sockets
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  const listaProductos = await productos.getAll();
  socket.emit("nueva-conexion", listaProductos);

  socket.on("new-product", (data) => {
    productos.save(data);
    io.sockets.emit("producto", data);
  });
  //Para enviar todos los mensajes en la primera conexion
  const listaMensajes = await messages.getAll();
  socket.emit("messages", listaMensajes);

  //Evento para recibir nuevos mensajes
  socket.on("new-message", async (data) => {
    data.time= moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
    await messages.save(data);
    const listaMensajes = await messages.getAll();
    io.sockets.emit("messages", listaMensajes);
  });
});
