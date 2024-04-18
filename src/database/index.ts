import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

mongoose.set("strictQuery", true)
mongoose.connect(`${process.env.MONGO}`).then(() => console.log("Connected!")).catch((err) => console.log(err))
