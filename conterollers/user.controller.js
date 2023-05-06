import connectDB from "../db/nosql.db.js"
import { v4 as uuidv4 } from 'uuid'

import transaction from '../models/transactions.model.js'

export const connectMongoDB = async () => connectDB
        .then(console.log('nosql database connected'))
        .catch(console.error)


export const createTransaction = async (req, res) => {
        const id = uuidv4()
        const to = "0x00ca561d61e8e1d71c54"
        const from = "0x561ca81b818d4b1681ac"
        const timestamp = Date.now()
        const amount = 100.0

        const newtransaction = new transaction({
                id,
                to,
                from,
                timestamp,
                amount,
        })

        newtransaction.save()
                .then(data => {
                        console.log({ data })
                        res.send({ data })
                })
                .catch(console.error)
}
