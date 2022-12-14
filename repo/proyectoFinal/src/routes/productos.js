//Ruta de Productos************
import express from 'express';
//import { Contenedor } from '../contenedor/contenedorFs.js';
import ContenedorProductos from '../dao/productos/productosDaoMongo.js';
const rutaProducto = express.Router();

const productos = new ContenedorProductos();

//middleware
const privilegio = (peticion,respuesta,next) => {
    const administrador = peticion.headers.administrador;
    if (administrador == 1234){
      next();
    } else {
      respuesta.status(401).send({error : -1, descripcion: `path ${peticion.url} no autorizada`});
    }
}

//Endpoints***
rutaProducto.get('/', async (peticion, respuesta) => {
  const listaProductos = await productos.getAll();
  respuesta.json(listaProductos);
});

rutaProducto.get('/:id', async(peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const productoId = await productos.getById(id);
  respuesta.json(productoId);
});

rutaProducto.post('/', privilegio, async (peticion, respuesta) => {
  const nuevoProducto = peticion.body;
  await productos.save(nuevoProducto);
  respuesta.status(200).json(nuevoProducto);
});

rutaProducto.put('/:id',  privilegio, async (peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const nuevoProducto = peticion.body;
  nuevoProducto._id=id;
  await productos.update(nuevoProducto);
  respuesta.status(200).json(nuevoProducto);
});

rutaProducto.delete('/:id',  privilegio, async (peticion, respuesta) => {
  const id = peticion.params.id;
  await productos.deleteById(id);
  respuesta.status(200).json({
    status: 'Producto Eliminado'
  })
});

export { rutaProducto };