import { v4 as uuidv4 } from 'uuid'

import nosqldb from "../models/transactions.model.js"
import sqldb from '../db/sql.db.js'

import { hashData, uuidValidateV4 } from "../utils/utils.js"

const USER = sqldb.user
const NOSQLDB = nosqldb

export const addChild = async (req, res) => {
    let user = req.body

    let parent_id = user.parentId
    let first_name = user.firstName
    let last_name = user.lastName
    let username = user.username
    let password = user.password
    let address = user.address
    let gender = user.gender
    let dob = user.dob

    if (!parent_id || !first_name || !last_name || !username ||
        !password || !address || !gender || !dob) {
        res.json({
            error: "missing required data",
            data: {
                parent_id,
                first_name,
                last_name,
                username,
                password,
                address,
                gender,
                dob,
            }
        })

    } else if (!uuidValidateV4(parent_id)) {
        res.json({
            message: "invalid user id",
            data: { id: parent_id }
        })

    } else {
        let hashedPassword = await hashData(password)

        let newUser = new USER({
            id: uuidv4(),
            parent_id,
            first_name,
            last_name,
            username,
            password: hashedPassword,
            address,
            gender,
            dob,
            is_child: true,
            _created_at: Date.now(),
        })

        newUser.save()
            .then(savedUser => res.json({ message: "sucessfull add child", data: savedUser }))
            .catch(err => res.json({ error: err.message }))
    }
}

export const getUser = async (req, res) => {
    let id = req.query.id

    if (!id) {
        res.json({
            error: "missing required data",
            data: { id }
        })

    } else if (!uuidValidateV4(id)) {
        res.json({
            message: "invalid user id",
            data: { id }
        })

    } else {
        USER.findOne({ where: { id } })
            .then(user => res.json({ message: "get user successfully", data: user }))
            .catch(err => res.json({ error: err.message }))
    }
}

export const getAllChildren = async (req, res) => {
    let parentId = req.query.parentId

    if (!parentId) {
        res.json({
            error: "missing required data",
            data: { parent_id: parentId }
        })

    } else if (!uuidValidateV4(parentId)) {
        res.json({
            message: "invalid user id",
            data: { id: parentId }
        })

    } else {
        USER.findAll({ where: { parent_id: parentId } })
            .then(user => res.json({ message: "get all children successfully", data: user }))
            .catch(err => res.json({ error: err.message }))
    }
}

export const addCard = async (req, res) => {
    let card = req.body

    let id = card.id
    let credit_card_num = card.creditCardNum
    let credit_card_pass = card.creditCardPass
    let credit_card_expiration_date = card.creditCardExpirationDate
    let restrictions = card.restrictions
    let balance = card.balance

    if (!id || !credit_card_num || !credit_card_pass ||
        !credit_card_expiration_date || !restrictions || !balance) {
        res.json({
            error: "missing required data",
            data: {
                id,
                credit_card_num,
                credit_card_pass,
                credit_card_expiration_date,
                restrictions,
                balance,
            }
        })

    } else if (!uuidValidateV4(id)) {
        res.json({
            message: "invalid user id",
            data: { id }
        })

    } else {
        let isCardAdded = await USER.update({
            credit_card_num,
            credit_card_pass,
            credit_card_expiration_date,
            restrictions,
            balance,
            _updated_at: Date.now(),
        }, {
            where: { id }
        })

        isCardAdded
            ? res.json({ message: "sucessfull add card", isCardAdded })
            : res.json({ error: err.message })
    }
}

export const searchByUsername = (req, res) => {
    let username = req.query.username

    if (!username) {
        res.json({ error: "missing required data", username })

    } else {
        USER.findOne({ where: { username } })
            .then(user => res.json({ message: "sucessfull search", data: user }))
            .catch(err => res.json({ error: err.message }))
    }
}

export const createTransaction = async (req, res) => {
    let _id = uuidv4()
    let from = req.body.from
    let to = req.body.to
    let amount = req.body.amount

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
        let timestamp = Date.now()

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

            res.send({ fromTx, toTx })

        } else {
            res.json({ message: "invalid users", data: { from: fromUser, to: toUser } })

        }
    }
}

export const getTransactions = async (req, res) => {
    let id = req.query.id

    if (!id) {
        res.json({ error: "missing required data", id })

    } else if (!uuidValidateV4(id)) {
        res.json({ error: "invalid user id", id })

    } else {
        let userTransactions = await NOSQLDB.collection(id).find({}).toArray()

        console.log({ userTransactions })
        res.send({ userTransactions })
    }
}
