require('dotenv').config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('productos').del();

  // Inserts seed entry
  await knex('productos').insert({
    nombre: 'mochila',
    precio: 100,
    deleted: 0,
    created_at: new Date(),
    updated_at: null,
    deleted_at: null,
  });
};
