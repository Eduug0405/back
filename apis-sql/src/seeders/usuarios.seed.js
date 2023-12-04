require('dotenv').config();
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del();

  // Inserts seed entries
  await knex('usuarios').insert([
    {
      email: 'email1@gmail.com',
      password: bcrypt.hashSync('12345', saltosBcrypt),
      deleted: 0,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null
    }
  ]);
};