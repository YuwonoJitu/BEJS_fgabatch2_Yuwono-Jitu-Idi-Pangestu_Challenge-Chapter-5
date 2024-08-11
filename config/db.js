//configuration for database conncection
const { Pool } = require('pg');

//membaca file .env
require('dotenv').config();

//process.env.DB_User -> Memanggil variabel DB_USe

// Membuat koneksi ke database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

module.exports = Pool;