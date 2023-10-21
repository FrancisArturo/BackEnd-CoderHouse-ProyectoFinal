import { connect } from "mongoose";
import { DB_CNN } from "../config/config.js";
import { DB_NAME } from "../config/config.js"
import { getLogger } from "../utils/logger.js";

const logger = getLogger();
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
        logger.info("Database connected");
    } catch (error) {
        logger.info(error);
        throw new Error("Error connecting to database");
    }
}

export default connectDB;

