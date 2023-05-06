import { Schema, model } from "mongoose"

const txSchema = new Schema({
 txHash: String,
 from: String,
 to: String,
 amount: Number,
 timestamp: Number,
})

const tx = model("transactions", txSchema)
export default tx
