import mongoose from "mongoose";
import 'dotenv/config'


export async function connectDB() {
    try {

       const db =  await mongoose.connect(process.env.MONGODB_URL)
       console.log(`DB connected successfully!`)
         
        
    } catch (error) {
        console.error(`Error connectiong to MongoDB: ${error}`);
        process.exit(1)
    }
}
