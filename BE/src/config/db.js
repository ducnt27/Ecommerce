import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()
export const connectDB = async () => {
    try {
        const uri = process.env.DB_URL;
        // console.log("Connecting to MongoDB at URI:", uri);
        if (!uri) {
            throw new Error('DB_URI is not defined');
        }
        await mongoose.connect(uri);
        console.log('Connected to db')
    } catch (error) {
        console.log('Failed to connect', error)
    }
}