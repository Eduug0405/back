/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
    CREATE TABLE usuarios (
        id int NOT NULL AUTO_INCREMENT,
        email varchar(60) NOT NULL,
        password varchar(20) NOT NULL,
        deleted tinyint NOT NULL DEFAULT '0',
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT NULL,
        deleted_at datetime DEFAULT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
      
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw("DROP TABLE usuarios");
};
