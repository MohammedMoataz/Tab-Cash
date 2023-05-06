import { connect } from 'mongoose'
import { config } from 'dotenv'

config()

const mongo_url = process.env.MONGODB_URL
const connectDB = connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export default connectDB
