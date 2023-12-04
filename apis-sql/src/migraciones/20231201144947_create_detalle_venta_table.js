/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
    CREATE TABLE detalle_venta (
        id int NOT NULL AUTO_INCREMENT,
        id_venta int NOT NULL,
        id_producto int NOT NULL,
        cantidad int NOT NULL,
        precio int NOT NULL,
        total int NOT NULL,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
      
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw("DROP TABLE detalle_venta");
};
