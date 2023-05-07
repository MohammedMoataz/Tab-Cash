import mongoose from 'mongoose'

import connectDB from "../db/nosql.db.js"

connectDB
        .then(console.log('nosql database connected'))
        .catch(console.error)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("Connected to MongoDB")

    const transactionSchema = new mongoose.Schema({
        id: String,
        from: String,
        to: String,
        amount: Number,
        timestamp: Date
    })

    const Transaction = mongoose.model('Transaction', transactionSchema)

    const firstDocument = new Transaction({
        id: "1",
        from: "Mohammed",
        to: "Heba",
        amount: 100.0,
        timestamp: new Date()
    })

    firstDocument.save((err, firstDocument) => {
        if (err) return console.error(err)
        console.log("Document inserted")
    })
})