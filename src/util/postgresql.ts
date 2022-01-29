import { Pool } from 'pg'

const pool = new Pool({
    user: process.env.PG_USER,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST
})

module.exports = { pool }
