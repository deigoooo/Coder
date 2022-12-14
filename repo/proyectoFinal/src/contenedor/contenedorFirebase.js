import admin from 'firebase-admin';
import serviceAccount from '../config.js';
//const serviceAccount = require("../proyectofinal.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.firebase)
});


export class Contenedor {
  constructor(db, query ) {
    this.db= admin.firestore();
    this.query = db.collections('ecommerce')
  }

  async save(objeto) {

    let doc = await this.query.add(objeto);

    return doc.id;

  }

  async getById(id) {

    const doc = await this.query.get();
    doc.array.forEach(element => {
      if (element.id == id) {
        return element;
      }
      return null;
    });

  }

  async update(producto) {

    await this.coleccion.updateOne({'_id': producto._id}, producto);

  }

  async getAll() {

    let docs = await this.query.get();
    docs.array.forEach(element => {
      const doc = {id: element.id, ...element.data()};
      return doc;
    });
  
  }

  async deleteById(id) {

    const doc = await this.coleccion.deleteOne({ '_id': id });

  }

  async deleteAll() {

    const doc = await this.coleccion.delete();
  
  }

}