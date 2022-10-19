//Importamos la libreria file system
const fs = require('fs');
const fechaYHora = (new Date()).toString() + '\n';

try {
  //Guardamos el archivo con la fecha y hora
  console.log ('aca')
  fs.writeFileSync('clase4/outputs/fyh.txt', fechaYHora);

  //Obtenemos el archivo que guardamos
  const archivo = fs.readFileSync('clase4/outputs/fyh.txt', 'utf-8');

  //Imprimimos el archivo
  console.log(archivo);
} catch (error) {
  console.log ('aca no')
  //Imprimimos cualquier posible error
  console.log(error);
}

