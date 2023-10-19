import { config } from "dotenv";

config({
    path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
    NODE_ENV,
    PORT,
    API_VERSION,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_CNN,
    SECRET_CODE_JWT,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    PERSISTENCE,
    EMAIL,
    PSW_EMAIL,
    SMS_ACC_SID,
    SMS_AUTH_TOKEN,
    PHONE,
    BASE_API_URL,
} = process.env;