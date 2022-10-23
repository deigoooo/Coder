const fs = require('fs');

class Procesos{
    constructor(archivo){
        this.archivo = archivo;
    }

    getAll=async()=>{
        try {
            if(fs.existsSync(this.archivo)){
                console.log('Leyendo archivo');
                let info= await fs.promises.readFile(this.archivo, 'utf8');
                let result= JSON.parse(info);
                console.log('se guardo el contenido en result');
                return result;
            }else{
                return "No se encontro el archivo"
            }
        } catch (error) {
            console.log(error)            
        }
    }
}
module.exports = Procesos