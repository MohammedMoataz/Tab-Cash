import { MongoClient } from 'mongodb'

import { config } from 'dotenv'

config()

const mongo_url = process.env.MONGODB_URL

const client = new MongoClient(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Connect to the MongoDB cluster
await client.connect()

export default client
