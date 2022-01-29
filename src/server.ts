import express from 'express'
import { wreathRouter } from './routes/wreaths'

export const app = express()

app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(express.json({ limit: '10mb' }))

app.use('/', wreathRouter)

export async function init() {
    const SERVICE_PORT = process.env.SERVICE_PORT || 3000

    app.listen(SERVICE_PORT, () => {
        console.info(`provenance listening on http://localhost:${SERVICE_PORT}`)
    })
}