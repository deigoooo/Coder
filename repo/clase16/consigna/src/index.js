import options from './src/connection/options';
import knex from "knex";

const connection = knex(options);

( async () => {
    try {
        const mensajes = await connection.schema.hasTable('mensajes');
        const productos = await connection.schema.hasTable('productos');
        
        if (!mensajes) {
            await connection.schema.createTable('mensajes', (table) => {
                table.increments('id').primary;
                table.string('email', 45).notNullable();
                table.string('text', 160).notNullable();
                table.string('time');
            });
        }
        if (!productos) {
            await connection.schema.createTable('productos', (table) => {
                table.increments('id').primary;
                table.string('title', 45).notNullable();
                table.string('price', 160).notNullable();
                table.string('thumbnail');
            });
        }     

        connection.destroy();

    } catch (error) {
        console.log(error);
    }
})()
