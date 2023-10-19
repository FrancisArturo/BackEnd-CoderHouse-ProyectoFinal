import  twilio  from "twilio";
import { SMS_ACC_SID, SMS_AUTH_TOKEN } from "../config/config.js";

export const client = twilio(SMS_ACC_SID, SMS_AUTH_TOKEN);

