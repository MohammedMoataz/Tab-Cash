import { hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { version as uuidVersion } from 'uuid'
import { validate as uuidValidate } from 'uuid'

config()

/**
 * 
 * @param {Object} data the data needed to be hashed
 * @returns the hashed data
 */
export const hashData = async data => {
    const salt = process.env.SALT

    const hashedData = hashSync(data, salt)

    return `${hashedData}`
}

/**
 * 
 * @param {Object} obj object who's need the access key
 * @returns 
 */
export const generateAccessToken = async obj =>
    jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })

/**
 * 
 * @param {String} token expired token which will be refreshed
 * @returns the refresh access token
 */
export const refreshAccessToken = token =>
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)


export const uuidValidateV4 = uuid =>
    uuidValidate(uuid) && uuidVersion(uuid) === 4
