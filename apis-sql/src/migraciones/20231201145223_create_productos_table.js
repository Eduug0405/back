/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
    CREATE TABLE productos (
        id int NOT NULL AUTO_INCREMENT,
        nombre varchar(60) NOT NULL,
        precio int NOT NULL,
        deleted tinyint NOT NULL DEFAULT '0',
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT NULL,
        deleted_at datetime DEFAULT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
      
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw("DROP TABLE productos");
};
