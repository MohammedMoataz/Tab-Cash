import { v4 as uuidv4 } from 'uuid'
import mongoose from 'mongoose'

import connectDB from "../db/nosql.db.js"

export const connectMongoDB = async () => connectDB
    .then(console.log('nosql database connected'))
    .catch(console.error)

export const createTransaction = async (req, res) => {
    const db = mongoose.connection

    const transactionSchema = new mongoose.Schema({
        id: String,
        from: String,
        to: String,
        amount: Number,
        timestamp: Date,
    })

    const Transaction = mongoose.model('transactions', transactionSchema)

    const firstDocument = new Transaction({
        id: "1",
        from: "Mohammed",
        to: "Heba",
        amount: 100.0,
        timestamp: new Date()
    })

    firstDocument.save()
        .then(data => res.send({ data }))
        .catch(error => res.send({ error: error.message }))
}
