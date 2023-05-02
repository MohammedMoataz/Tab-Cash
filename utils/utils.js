import { hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const hashData = async data => {
    const salt = process.env.SALT

    const hashedData = hashSync(data, salt)

    return `${hashedData}`
}

const generateAccessToken = async obj =>
    jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })

const refreshAccessToken = token =>
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

export default {
    hashData,
    generateAccessToken,
    refreshAccessToken,
}
