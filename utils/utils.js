import jwt from 'jsonwebtoken'
import { hashSync } from 'bcrypt'
import { config } from 'dotenv'
import { version as uuidVersion } from 'uuid'
import { validate as uuidValidate } from 'uuid'

config()

/**
 * hashes data
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
 * generate the access token for the current user
 * 
 * @param {Object} obj object who's need the access key
 * @returns the access token
 */
export const generateAccessToken = async obj =>
    jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: "1d" })

/**
 * refresh the token for the current user
 * 
 * @param {String} token expired token which will be refreshed
 * @returns the refresh access token
 */
export const refreshAccessToken = token =>
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

/**
 * validate the uuid of the current user
 * 
 * @param {String} uuid user uuid
 * @returns if the uuid is valid and v4
 */
export const uuidValidateV4 = uuid =>
    uuidValidate(uuid) && uuidVersion(uuid) === 4
