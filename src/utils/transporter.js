import nodemailer from "nodemailer";
import { EMAIL, PSW_EMAIL } from "../config/config.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    user: "smpt.gmail.com",
    port: "465",
    secure: true,
    auth: {
        user: EMAIL,
        pass: PSW_EMAIL
    },
});

