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

    await this.collection.updateOne({'_id': producto.id}, { $set: { ...producto } });

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


/* (async () => {
    try {
      await mongoose.connect('mongodb+srv://root:d1i9e8g8o@prueba.26ov04v.mongodb.net/ecommerce?retryWrites=true&w=majority', {})
      const carritos = await carritosModel.find({});
      console.log(carritos);
    } catch (error) {
      console.log(error);
    }
  })(); */