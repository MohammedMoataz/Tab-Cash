import { v4 as uuidv4 } from 'uuid'

import nosqldb from "../models/transactions.model.js"
import sqldb from '../db/sql.db.js'
import mongoClient from "../db/nosql.db.js"

import { hashData, uuidValidateV4 } from "../utils/utils.js"

const USER = sqldb.user
const NOSQLDB = nosqldb

export const addChild = async (req, res) => {
    let user = req.body

    let id = uuidv4()
    let parent_id = user.parentId
    let first_name = user.firstName
    let last_name = user.lastName
    let username = user.username
    let password = user.password
    let age = user.age
    let address = user.address
    let gender = user.gender
    let dob = user.dob
    let is_child = true
    let _created_at = Date.now()

    if (!id || !parent_id || !first_name || !last_name || !username || !password ||
        !age || !address || !gender || !dob || !is_child) {
        res.json({
            message: "failed process",
            error: "missing required data",
            data: {
                parent_id,
                first_name,
                last_name,
                username,
                password,
                age,
                address,
                gender,
                dob,
            }
        })

    } else {
        let hashedPassword = await hashData(password)

        let newUser = new USER({
            _id,
            parent_id,
            first_name,
            last_name,
            username,
            password: hashedPassword,
            age,
            address,
            gender,
            dob,
            is_child,
            _created_at,
        })

        newUser.save()
            .then(savedUser => res.json({ message: "sucessfull add child", data: savedUser }))
            .catch(err => res.json({ message: "failed process", error: err.message }))
    }
}

export const createTransaction = async (req, res) => {
    let _id = uuidv4()
    let from = req.body.from
    let to = req.body.to
    let amount = req.body.amount
    let timestamp = Date.now()

    if (!from || !to || !amount) {
        res.json({
            message: "missing required data",
            data: {
                from,
                to,
                amount,
            }
        })

    } else if (isNaN(amount)) {
        res.json({ message: "invalid amount", data: amount })

    } else if (!uuidValidateV4(from) || !uuidValidateV4(to)) {
        res.json({
            message: "invalid users",
            data: {
                from,
                to,
                amount,
            }
        })

    } else {
        let fromUser = await USER.findOne({ where: { id: from } })
        let toUser = await USER.findOne({ where: { id: to } })

        if (fromUser && toUser) {
            let fromCollection = NOSQLDB.collection(`${from}`)
            let toCollection = NOSQLDB.collection(`${to}`)

            let fromTx = await fromCollection.insertOne({
                _id,
                from,
                to,
                amount,
                timestamp,
            })

            let toTx = await toCollection.insertOne({
                _id,
                from,
                to,
                amount,
                timestamp,
            })

            mongoClient.close()

            res.send({ fromTx, toTx })

        } else {
            res.json({ message: "invalid users", data: { from: fromUser, to: toUser } })

        }
    }
}

export const searchByUsername = (req, res) => {
    let username = req.query.username
    console.log({ username })

    if (!username) {
        res.json({ message: "missing required data", username })

    } else {
        USER.findOne({ where: { username } })
            .then(user => res.json({ message: "sucessfull search", data: user }))
            .catch(err => res.json({ message: "failed process", error: err.message }))
    }
}

export const getTransactions = async (req, res) => {
    let id = req.query.id
    console.log({ id })

    if (!id) {
        res.json({ message: "missing required data", id })

    } else if (!uuidValidateV4(id)) {
        res.json({ message: "invalid user id", id })

    } else {
        let userCollection = NOSQLDB.collection(id).find({}).toArray()

        console.log({ userCollection })
        res.send({ userCollection })

    }
}
