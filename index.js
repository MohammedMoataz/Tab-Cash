import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

import db from './database/database.js'
import authRoutes from "./routes/auth.routes.js"
import bodyParser from 'body-parser'

config()

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', authRoutes)

//  http://localhost:4000/
db.sequelize.authenticate()
    .then(() => app.listen(PORT, () =>
        console.log(`Server is listening on PORT ${PORT}`)
    ))
    .catch(err => console.log('ERROR: ', err.message))
