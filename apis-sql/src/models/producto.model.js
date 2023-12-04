const db = require('../configs/db.config');

class Producto {

    constructor({ id, nombre, precio, deleted, createdAt, updatedAt, deletedAt }) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static async getAll({ offset, limit }, { sort, order }) {
        const connection = await db.createConnection();
        let query = "SELECT id, nombre, precio, deleted, created_at, updated_at, deleted_at FROM productos WHERE deleted = 0 ORDER BY LEFT(nombre, 1)";

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

     



    static async getById(id) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT id, nombre, precio, deleted, created_at, updated_at, deleted_at FROM productos WHERE id = ? AND deleted = 0", [id]);
        connection.end();

        if (rows.length > 0) {
            const row = rows[0];
            return new Producto({ id: row.id, nombre: row.nombre, precio: row.precio, deleted: row.deleted, createdAt: row.created_at, updatedAt: row.updated_at, deletedAt: row.deleted_at });
        }

        return null;
    }

    static async deleteLogicoById(id) {
        const connection = await db.createConnection();

        const deletedAt = new Date();
        const [result] = connection.execute("UPDATE productos SET deleted = 1, deleted_at = ? WHERE id = ?", [deletedAt, id]);

        connection.end();

        if (result.affectedRows === 0) {
            throw new Error("No se pudo eliminar el producto");
        }

        return
    }

    static async deleteFisicoById(id) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("DELETE FROM productos WHERE id = ?", [id]);
        connection.end();

        if (result.affectedRows == 0) {
            throw new Error("no se eliminó el producto");
        }

        return
    }

    static async updateById(id, { nombre, precio }) {
        const connection = await db.createConnection();

        const updatedAt = new Date();
        const [result] = await connection.execute("UPDATE productos SET nombre = ?, precio = ?, updated_at = ? WHERE id = ?", [nombre, precio, updatedAt, id]);

        if (result.affectedRows == 0) {
            throw new Error("no se actualizó el producto");
        }

        return
    }

    static async count() {
        const connection = await db.createConnection();
        const [rows] = await connection.query("SELECT COUNT(*) AS totalCount FROM productos WHERE deleted = 0");
        connection.end();

        return rows[0].totalCount;
    }

    async save() {
        const connection = await db.createConnection();

        const createdAt = new Date();
        const [result] = await connection.execute("INSERT INTO productos (nombre, precio, created_at) VALUES (?, ?, ?)", [this.nombre, this.precio, createdAt]);

        connection.end();

        if (result.insertId === 0) {
            throw new Error("No se insertó el producto");
        }

        this.id = result.insertId;
        this.deleted = 0;
        this.createdAt = createdAt;
        this.updatedAt = null;
        this.deletedAt = null;

        return
    }
}

module.exports = Producto;