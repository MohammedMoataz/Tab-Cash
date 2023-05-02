import { config } from 'dotenv'

import db from '../database/database.js'
import utils from '../utils/utils.js'

config()

const USER = db.user

export const register = async (req, res) => {
    let user = req.body

    let parentId = user.parentId
    let firstName = user.firstName
    let lastName = user.lastName
    let username = user.username
    let email = user.email
    let password = user.password
    let age = user.age
    let address = user.address
    let gender = user.gender
    let phone = user.phone
    let dob = user.dob

    let hashedPassword = await utils.hashData(password)

    let newUser = new USER({
        parentId: parentId,
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: hashedPassword,
        age: age,
        dob: dob,
        address: address,
        gender: gender,
        phone: phone,
        _created_at: Date.now(),
    })

    newUser.save()
        .then(savedUser => res.json({ message: "sucessfull registration", data: savedUser }))
        .catch(err => res.json({ message: "failed process", error: err.message }))
}

export const login = async (req, res) => {
    let email = req.query.email
    let password = req.query.password

    let hashedPassword = await utils.hashData(password)

    USER.findOne({
        where: {
            email: email,
            password: hashedPassword
        }
    })
        .then(async data => {
            let loggedUser = data.dataValues
            let accessToken = await utils.generateAccessToken({ id: loggedUser.id, username: loggedUser.username })

            USER.update({
                access_token: accessToken,
                _updated_at: Date.now(),
            }, {
                where: {
                    id: loggedUser.id
                }
            })
                .then(res.json({ message: "sucessfull login", accessToken, data: loggedUser }))
                .catch(console.error)

        })
        .catch(err => {
            console.log({ err })
            res.json({ message: "Invalid email or password" })
        })
}

export const refreshAccessToken = async (req, res) => {
    try {
        let token = req.query.token

        if (!token) {
            throw new Error("refresh token missing")
        }

        let decoded = utils.refreshAccessToken(token)
        console.log({ decoded })

        if (decoded.access_token != token) {
            throw new Error("token is not valid")
        }

        const accesstoken = await utils.generateAccessToken({ id: decoded.id, username: decoded.username })

        res.json({ accesstoken, message: "refresh token successed" })

    } catch (error) {
        res.json({ message: "failed process", error: error.message })
    }
}
