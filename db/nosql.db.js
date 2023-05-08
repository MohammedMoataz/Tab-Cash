import { MongoClient } from 'mongodb'

import { config } from 'dotenv'

config()

const mongo_url = process.env.MONGODB_URL

const client = new MongoClient(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Connect to the MongoDB cluster
client.connect()
    .then(console.log("nosql database connected"))
    .catch(console.error)

export default client
