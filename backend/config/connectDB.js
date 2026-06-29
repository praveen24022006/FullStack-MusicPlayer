import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({path:"../.env"})

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongoDb connected successfully')
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;