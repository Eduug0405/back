require('dotenv').config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('detalle_venta').del();

  // Inserts seed entry
  await knex('detalle_venta').insert({
    id_venta: 1,
    id_producto: 1,
    cantidad: 2,
    precio: 10,
    total: 20,
    created_at: new Date(),
    updated_at: null
  });
};