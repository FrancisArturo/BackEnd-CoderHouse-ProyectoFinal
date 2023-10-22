import { getLogger } from "./logger.js";

const logger = getLogger();

export default class CustomError {
    static createError({ name="Error", cause, message, code=1 }){
        logger.error(cause);
        const error = new Error(message, { cause });
        error.name = name;
        error.code = code;
        throw error;
    }

}