const express = require('express')
const app = express()
const PORT = 8080
const postgres = require('postgres')
const sql = postgres({...options})

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`app running on ${PORT}`)
)

app.get('/wreaths', (req, res) => {
    res.status(200).send({
        wreath: 'blue wreath'
    })
})

app.post('/wreaths/:id', (req, res) => {
    const {id} = req.params
    const {logo} = req.body

    if (!logo) {
        res.status(418).send({message: 'need a wreath color'})
    }

    res.send({
        wreath: `${id}`
    })
})