const express = require('express');

const app= express();
const PORT= 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const server= app.listen(PORT,()=>{
    console.log(`Servidor escuchando: ${server.address().port}`);
})

server.on('error', error => console.log(`Error: ${error}`));