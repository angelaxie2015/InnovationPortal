import mongoose from "mongoose"
import dotenv from "dotenv"
import eventSchema from "./eventSchema.js"
import userSchema from "./userSchema.js"

// todo add comment
export default function connectionFactory() {
    dotenv.config();
    // DB
    const mongoURI = process.env.MONGODB_CONNECTION;

    //Database configuration 
    const conn = mongoose.createConnection(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });

    conn.model('Event', eventSchema);
    conn.model('User', userSchema);

    return conn;
}