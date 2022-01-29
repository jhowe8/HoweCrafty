import { Wreath } from "../types"
const { pool } = require("../util/postgresql");
import { v4 as uuidv4 } from 'uuid'


export async function getAllWreaths() {
    const res = await pool.query(
        "SELECT (id, size, price) FROM WREATHS"
    )
    return res.rows
}

export async function insertWreath(wreath: Wreath) {
    const res = await pool.query(
        "INSERT INTO WREATHS (id, size, price) VALUES ($1, $2, $3)", [uuidv4(), wreath.size, wreath.price]
    )
    console.log(`Added wreath with size ${wreath.size} and color ${wreath.color}`)
}