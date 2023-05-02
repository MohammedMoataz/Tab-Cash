import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const hashData = async data => {
    const salt = process.env.SALT

    const hashedData = hash(data, salt)

    return hashedData
}

const generateAccessToken = async obj =>
    jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })

export default {
    hashData,
    generateAccessToken,
}
