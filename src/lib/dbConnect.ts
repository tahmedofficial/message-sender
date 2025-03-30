import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {

}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected t database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        console.log("database db", db);
        connection.isConnected = db.connections[0].readyState
        console.log("database connection", connection.isConnected);
        console.log("db connected successfully");

    }
    catch {
        console.log("Database Connection failed");
        process.exit(1);
    }
}

export default dbConnect;