const db = require('../configs/db.config');

class Venta {

    constructor({ id, total, fecha, createdAt, updatedAt }) {
        this.id = id;
        this.total = total;
        this.fecha = fecha;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async save() {
        const connection = await db.createConnection();

        const createdAt = new Date();
        const fecha = new Date();
        const [result] = await connection.execute("INSERT INTO ventas (total, fecha, created_at) VALUES (?, ?, ?)", [this.total, fecha, createdAt]);

        connection.end();
        
        if (result.insertId === 0) {
            throw new Error("no se insertó la venta");
        }

        this.id = result.insertId;
        this.fecha = fecha;
        this.createdAt = createdAt;

        return this.id;
    }

    async saveWithTransaction(connection) {
        const createdAt = new Date();
        const fecha = new Date();
        const [result] = await connection.execute("INSERT INTO ventas (total, fecha, created_at) VALUES (?, ?, ?)", [this.total, fecha, createdAt]);
        
        if (result.insertId === 0) {
            throw new Error("no se insertó la venta");
        }

        return result.insertId;
    }
}

module.exports = Venta