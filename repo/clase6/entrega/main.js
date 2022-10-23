const express = require("express");
const Procesos = require("./procesos.js");

const procesos = new Procesos("productos.txt");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Bienvenidos a mi server");
});

app.get("/productos", (req, res) => {
    
    todos = async () => {
        const arrayCompleto = await procesos.getAll();
        let formato= ``;
        arrayCompleto.map(
            item=>(formato += `<table style="border:black 1px solid; "><tr><td style="border:black 1px solid;"><h3>ID: ${item.id}</h3></td> <td style="border:black 1px solid;"><h3 style= "width:200px;">Nombre: ${item.title}</h3></td> <td style="border:black 1px solid;"><h3>Precio: ${item.price}</h3></td> <td style="border:black 1px solid;"><h3>Thumbnail: ${item.thumbnail}</h3></td></tr></table>`)
        );
        res.send(`<h1>la lista de productos es la siguiente:</h1> ${formato}`);

    };
  todos();  
});

app.get("/productoRandom", (req, res) => {
  res.send("Bienvenidos a mi producto random");
});

const connectionServer = app.listen(PORT, () => {
  console.log(
    `Aplicacion escuchando en el puerto ${connectionServer.address().port}`
  );
});

connectionServer.on("error", (error) =>
  console.log(`Ha ocurrido un error: ${error}`)
);
