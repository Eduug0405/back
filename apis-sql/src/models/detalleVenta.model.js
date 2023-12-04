const db = require('../configs/db.config');

class DetalleVenta {

    constructor({id, idVenta, idProducto, cantidad, precio, total, createdAt, updatedAt}) {
        this.id = id;
        this.idVenta = idVenta;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precio = precio;
        this.total = total;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static async getAll({ offset, limit }, { sort, order }) {
        const connection = await db.createConnection();
        let query = "SELECT p.nombre, d.cantidad, d.total FROM productos p INNER JOIN detalle_venta d ON p.id = d.id_producto WHERE DATE(d.created_at) = CURDATE()";

        if (sort && order) {
            query += ` ORDER BY ${sort} ${order}`
        }

        if (offset >= 0 && limit) {
            query += ` LIMIT ${offset}, ${limit}`;
        }

        const [rows] = await connection.query(query);
        connection.end();

        return rows;
    }
    


    static async count() {
        const connection = await db.createConnection();
        const [rows] = await connection.query("SELECT COUNT(*) AS totalCount FROM detalle_venta      WHERE deleted = 0");
        connection.end();

        return rows[0].totalCount;
    }

    async save() {
        const connection = await db.createConnection();

        const createdAt = new Date();
        const [result] = await connection.execute("INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio, total, created_at) VALUES (?, ?, ?, ?, ?, ?)", [this.idVenta, this.idProducto, this.cantidad, this.precio, this.total, createdAt]);
        connection.end();

        if (result.insertId === 0) {
            throw new Error("no se insertó el detalle de la venta");
        }

        this.id = result.insertId;
        this.createdAt = createdAt;

        return this.id
    }

    async saveWithTransaction(connection) {
        const createdAt = new Date();
        const [result] = await connection.execute("INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio, total, created_at) VALUES (?, ?, ?, ?, ?, ?)", [this.idVenta, this.idProducto, this.cantidad, this.precio, this.total, createdAt]);

        if (result.insertId === 0) {
            throw new Error("no se insertó el detalle de la venta");
        }

        return result.insertId;
    }

    setIdVenta(idVenta) {
        this.idVenta = idVenta;
    }
}

module.exports = DetalleVenta;