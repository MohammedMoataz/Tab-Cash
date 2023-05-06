import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { config } from 'dotenv'

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import { connectMongoDB } from './conterollers/user.controller.js'

config()

const options = {
    explorer: true,
    failOnErrors: true,
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Tab Cash',
            version: '1.0.0',
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ['./routes/*.routes.js'],
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsdoc(options)

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', authRoutes)
app.use('/user', userRoutes)
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)

await connectMongoDB()

//  http://localhost:4000/
app.listen(PORT, () => {
    console.log(`Server is Listening on http://localhost:${PORT}`)
})

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: err,
    })
})
