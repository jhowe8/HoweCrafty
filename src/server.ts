import express from 'express'
import { wreathRouter } from './routes/wreaths'
import { createConnection } from "typeorm";
import { Wreath } from "./types"

export const app = express()

app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(express.json({ limit: '10mb' }))

app.use('/', wreathRouter)

export async function init() {
    const SERVICE_PORT = process.env.SERVICE_PORT || 3000

    createConnection({
        type: "postgres",
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        entities: [
            Wreath
        ],
        synchronize: true,
        logging: false
    })

    app.listen(SERVICE_PORT, () => {
        console.info(`provenance listening on http://localhost:${SERVICE_PORT}`)
    })
}