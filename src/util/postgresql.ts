// import { Pool } from 'pg'

// const pool = new Pool({
//     user: process.env.PG_USER,
//     database: process.env.PG_DB,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
//     host: process.env.PG_HOST
// })

// module.exports = { pool }

import { createConnection } from "typeorm";
import { EnumColor, Color, TimeOfTheYear, EnumTimeOfTheYear, Wreath } from "../types";

const connection = createConnection({
    type: "postgres",
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    entities: [
        Color, EnumColor, TimeOfTheYear, EnumTimeOfTheYear, Wreath
    ],
    synchronize: true,
    logging: true
})

module.exports = { connection }
