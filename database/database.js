import Sequelize from 'sequelize'
import { config } from 'dotenv'

import User from '../models/user.model.js'

config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.user = User(sequelize, Sequelize)

export default db