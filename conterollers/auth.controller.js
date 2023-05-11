import { v4 as uuidv4 } from 'uuid'
import { config } from 'dotenv'

import db from '../db/sql.db.js'
import { generateAccessToken, hashData } from '../utils/utils.js'

config()

const USER = db.user

export const register = async (req, res) => {
    let user = req.body

    let first_name = user.firstName
    let last_name = user.lastName
    let username = user.username
    let email = user.email
    let password = user.password
    let address = user.address
    let gender = user.gender
    let phone = user.phone
    let dob = user.dob
    let national_id = user.nationalId

    if (!first_name || !last_name || !username || !email || !password ||
        !address || !gender || !phone || !dob || !national_id) {
        res.json({
            error: "missing required data",
            data: {
                first_name,
                last_name,
                username,
                email,
                password,
                address,
                gender,
                phone,
                dob,
                national_id,
            }
        })

    } else {
        const myRe = /(@[a-zA-Z_.][a-zA-Z].[a-zA-Z]{2,3})/g
        const flag = myRe.test(email)

        const date = dob.split("-")
        const year = new Date(dob).getFullYear() - 1700
        const month = date[1]
        const day = date[2]
        const isNationalIdValid =
            national_id.substring(0, 3) === year.toString() &&
            national_id.substring(3, 5) === month &&
            national_id.substring(5, 7) === day

        if (flag && national_id.length == 16 && isNationalIdValid) {
            let hashedPassword = await hashData(password)

            let newUser = new USER({
                id: uuidv4(),
                parent_id: "root",
                first_name,
                last_name,
                username,
                email,
                password: hashedPassword,
                dob,
                address,
                gender,
                phone,
                national_id,
                _created_at: Date.now(),
            })

            newUser.save()
                .then(savedUser => res.json({ message: "sucessfull registration", data: savedUser }))
                .catch(err => res.json({ error: err.message }))

        } else {
            res.json({ error: "Invalid data" })
        }
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
                let accessToken = await generateAccessToken({
                    parentId: loggedUser.parent_id,
                    username: loggedUser.username
                })

                USER.update({
                    access_token: accessToken,
                    _updated_at: Date.now(),
                }, {
                    where: {
                        id: loggedUser.id
                    }
                })
                    .then((isUpdated) => {
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
