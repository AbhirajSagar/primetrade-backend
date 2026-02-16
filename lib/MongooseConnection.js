import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose"

const URI = process.env.MONGO_URI;
let Db;

export async function ConnectDb()
{
    if(Db) return Db

    try
    {
        Db = await mongoose.connect(URI, {dbName: 'public'})
        return Db;
    }
    catch (error)
    {
        console.error("DB Connection Failed:", error);
        
        //Stop the server instantly to troubleshoot database connection
        process.exit(1);
    }
}
