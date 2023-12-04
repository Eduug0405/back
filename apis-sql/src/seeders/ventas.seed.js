require('dotenv').config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ventas').del();

  // Inserts seed entry
  await knex('ventas').insert({
    total: 100,
    fecha: new Date(),
    created_at: new Date(),
    updated_at: null
  });
};
