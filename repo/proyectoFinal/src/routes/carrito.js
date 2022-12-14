//Ruta de Productos************
import express from 'express';

const rutaCarrito = express.Router();

import { productos, carritos } from '../dao/index.js';

//Endpoints
rutaCarrito.get('/', async (peticion, respuesta) => {
  
  /* Usar con mongoose
  const listaCarritos = await carritos.getAll();
  respuesta.json(listaCarritos);
}); */
  
  const listaCarritos = await carritos.getAllCarritos();
  respuesta.json(listaCarritos);
});

rutaCarrito.get('/:id/productos', async (peticion, respuesta) => {
  
  /* Usar con mongoose 
  const id = peticion.params.id;
  const listaProductos = await carritos.getById(id);
  respuesta.json(listaProductos.productos);
}); */
  
  const id = peticion.params.id;
  const listaProductos = await carritos.getByIdCarritos(id);
  respuesta.json(listaProductos.productos);
});

rutaCarrito.post('/', async (peticion, respuesta) => {
  const carrito = {
    timestamp: Date.now(),
    productos: []
  }
  const id = await carritos.save(carrito);
  respuesta.json(id);
});

rutaCarrito.post('/:id/productos', async (peticion, respuesta) => {
  
/* Usar con mongoose 
  const idCarrito = peticion.params.id;
  const idProducto = peticion.body.idProducto;

  const carrito = await carritos.getById(idCarrito);
  const producto = await productos.getById(idProducto);

  //console.log(carrito);
  //console.log(producto);
  
  await carrito.productos.push(producto);

  //console.log(carrito);
  
  await carritos.update(carrito);
  respuesta.json({
    status: 'ok'
  });
}); */
  
  const idCarrito = peticion.params.id;
  const idProducto = peticion.body.idProducto;

  const carrito = await carritos.getByIdCarritos(idCarrito);
  const producto = await productos.getById(idProducto);
  
  await carrito.productos.push(producto);
  
  await carritos.update(carrito,idCarrito);
  respuesta.json({
    status: 'ok'
  });
});

rutaCarrito.delete('/:id/productos/:id_prod', async (peticion, respuesta) => {
  const idCarrito = peticion.params.id;
  const idProducto = peticion.params.id_prod;
  const carrito = await carritos.getByIdCarritos(idCarrito);
  let indexToDelete = -1;
  carrito.productos.forEach((producto,index) => {
    if (producto.id == idProducto) {
      indexToDelete = index;
    };
  });
  if (indexToDelete => 0) {
    carrito.productos.splice(indexToDelete, 1);
  }
  await carritos.update(idCarrito, carrito);
  respuesta.json({
    status: 'ok'
  });
});

rutaCarrito.delete('/:id', async (peticion, respuesta) => {
  const id = peticion.params.id;
  await carritos.deleteById(id);
  respuesta.json({
    status: 'carrito eliminado'
  });
});



export { rutaCarrito };