import { v4 as uuidv4 } from 'uuid'
import { config } from 'dotenv'

import db from '../db/sql.db.js'
import { generateAccessToken, hashData, refreshAccessToken } from '../utils/utils.js'

config()

const USER = db.user

export const register = async (req, res) => {
    let user = req.body

    let id = uuidv4()
    let parent_id = "root"
    let first_name = user.firstName
    let last_name = user.lastName
    let username = user.username
    let email = user.email
    let password = user.password
    let age = user.age
    let address = user.address
    let gender = user.gender
    let phone = user.phone
    let dob = user.dob
    let national_id = user.nationalId

    if (!id || !parent_id || !first_name || !last_name || !username || !email || !password ||
        !age || !address || !gender || !phone || !dob || !national_id) {
        res.json({ message: "failed process", error: "missing required data", data: req.body })

    } else {
        let hashedPassword = await hashData(password)

        let newUser = new USER({
            id,
            parent_id,
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
            age,
            dob,
            address,
            gender,
            phone,
            national_id,
            _created_at: Date.now(),
        })

        newUser.save()
            .then(savedUser => res.json({ message: "sucessfull registration", data: savedUser }))
            .catch(err => res.json({ message: "failed process", error: err.message }))
    }
}

export const login = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        res.json({ message: "failed process", error: "missing required data", data: req.body })

    } else {

        let hashedPassword = await hashData(password)

        USER.findOne({
            where: {
                email: email,
                password: hashedPassword
            }
        })
            .then(async data => {
                let loggedUser = data.dataValues
                let accessToken = await generateAccessToken({ id: loggedUser.id, username: loggedUser.username })

                USER.update({
                    access_token: accessToken,
                    _updated_at: Date.now(),
                }, {
                    where: {
                        id: loggedUser.id
                    }
                })
                    .then(() => {
                        loggedUser.access_token = accessToken
                        res.json({ message: "sucessfull login", data: loggedUser })
                    })
                    .catch(console.error)

            })
            .catch(err => {
                console.log({ err })
                res.json({ message: "Invalid email or password" })
            })
    }
}

export const refreshToken = async (req, res) => {
    try {
        let token = req.query.token

        if (!token)
            throw new Error("refresh token missing")

        let decoded = refreshAccessToken(token)
        console.log({ decoded })

        if (decoded.access_token != token) {
            throw new Error("token is not valid")
        }

        const accesstoken = await generateAccessToken({ id: decoded.id, username: decoded.username })

        res.json({ message: "refresh token successed", accesstoken })

    } catch (error) {
        res.json({ message: "failed process", error: error.message })
    }
}
