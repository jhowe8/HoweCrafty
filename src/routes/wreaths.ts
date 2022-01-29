import express, { Request, Response } from 'express'
import { Wreath } from '../types'
import { getAllWreaths, insertWreath } from '../logic/wreaths'
import { validationMw } from '../util/validator'

export const wreathRouter = express.Router()

wreathRouter.get('/wreaths', async function (req, res, next) {
    // const token = req.headers?.authorization?.replace('Bearer', '')?.trim()
    Wreath.find().then((data) => {
        res.json(data)
    })


    // try {
    //     const data = await getAllWreaths()
    //     res.json({ data })
    // } catch(err) {
    //     console.error(err)
    //     return next(err)
    // }
})

wreathRouter.post('/wreaths', validationMw(Wreath), async function (req: Request, res: Response) {
    Wreath.insert(req.body)
    res.end()
    // const wreath = req.body
    // console.log(wreath)

    // await insertWreath(wreath)

    // res.json({ "data": [] })

})