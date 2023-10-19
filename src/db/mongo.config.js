import { connect } from "mongoose";
import { DB_CNN } from "../config/config.js";
import { DB_NAME } from "../config/config.js"


export const configConnection = {

    url: DB_CNN,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: DB_NAME,
    }
}

const connectDB = async () => {
    try {
        await connect(configConnection.url, configConnection.options);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
}

export default connectDB;

