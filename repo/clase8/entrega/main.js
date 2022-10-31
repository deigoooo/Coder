const express = require('express');
const { Router } = express;
const app = express();
const Metodos = require("./metodos.js")

let contenedor= new Metodos([])

const rutaProductos = Router();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/static', express.static(__dirname + '/public'));

//Datos de prueba
contenedor.save({
    title: 'PC',
    price: '4000',
    thumbnail: 'image1'
});
  
contenedor.save({
    title: 'Teclado',
    price: '400',
    thumbnail: 'image2'
});

//console.log(contenedor.getById(2))
//Endpoints
rutaProductos.get('/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    const producto = contenedor.getById(id);
    if (producto) {
      respuesta.json(producto);
    } else {
      respuesta.status(404);
      respuesta.json({ error : 'producto no encontrado' });
    }
    
  });
  
rutaProductos.get('/', (peticion, respuesta) => {
    const listaProductos = contenedor.getAll();
    respuesta.json(listaProductos);
});
  
rutaProductos.post('/', (peticion, respuesta) => {
    const producto = peticion.body;
    contenedor.save(producto);
    respuesta.send('ok');
});
  
rutaProductos.put('/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id)
    const productoModificar= contenedor.getById(id);
    console.log(productoModificar)
});
  
rutaProductos.delete('/:id', (peticion, respuesta) => {

});
  
app.use('/api/productos', rutaProductos);


const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando: ${server.address().port}`)
})

server.on('error', error=> console.log(`Error: ${error}`));
