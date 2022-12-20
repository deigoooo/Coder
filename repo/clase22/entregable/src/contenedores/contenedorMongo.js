import mongoose from 'mongoose';
import config from '../config.js';

await mongoose.set('strictQuery', true);
await mongoose.connect(config.mongodb.url);

export class Contenedor {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async save(objeto) {

    let doc = await this.coleccion.create(objeto);

    doc.id = doc._id;

    return doc.id;

  }

  async getById(id) {

    const doc = await this.coleccion.findOne({ '_id': id });
    if (doc){
      doc.id = doc._id;
      return doc;
    }
    return null;

  }

  async update(producto) {
    //console.log(producto._id);
    await this.coleccion.updateOne({'_id': producto._id}, { $set: { ...producto } });

  }

  async getAll() {

    let docs = await this.coleccion.find({});
    docs = docs.map((item) => {
      item.id = item._id;
      return item;
    });
    
    return docs;
  
  }

  async deleteById(id) {

    await this.coleccion.deleteOne({ '_id': id });

  }

  async deleteAll() {

    const doc = await this.coleccion.delete();
  
  }
}

export default Contenedor