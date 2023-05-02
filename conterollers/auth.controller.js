import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

import db from '../database/database.js'
import utils from '../utils/utils.js'

config()

const USER = db.user

export const register = async (req, res) => {
    try {
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
        let accessToken
        let refreshToken

        let hashedPassword = await utils.hashData(password)

        let newUser = new USER({
            parentId: parentId,
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: hashedPassword,
            age: age,
            address: address,
            gender: gender,
            phone: phone
        })

        let savedUser = await newUser.save()

        res.json({ message: "sucessfull registration", data: savedUser })

    } catch (error) {
        console.error(error)
        res.json({ message: "failed process", error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        let email = req.query.email
        let password = req.query.password
        let accessToken
        let refreshToken

        let hashedPassword = await utils.hashData(password)

        let loggedUser = await USER.findOne({
            where: {
                email: email,
                password: hashedPassword
            }
        })

        if (loggedUser) {
            accessToken = await utils.generateAccessToken({ id: loggedUser.id, email })
            refreshToken = jwt.sign({ id: loggedUser.id, email }, process.env.REFRESH_TOKEN_SECRET)

            //     // TODO: update patient access token

        } else {
            throw new Error("wrong email or password")
        }

        res.json({ message: "sucessfull login", accessToken, refreshToken, data: loggedUser })

    } catch (error) {
        res.json({ message: "failed process", error: error.message })
    }
}

export const refrshAccessToken = async (req, res) => {
    try {
        let token = req.query.token

        if (!token) {
            throw new Error("refresh token missing")
        }

        let decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

        // TODO: get refresh token

        // if (Refresh_token_Value != token) {
        //     throw new Error("REFRESH token IS NOT VALID")
        // }

        const accesstoken = await utils.generateAccessToken({ id: decoded.id, email: decoded.email })

        res.json({ accesstoken, message: "refresh token successed" })

    } catch (error) {
        res.json({ message: "failed process", error: error.message })
    }
}
