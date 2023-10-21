import winston from "winston";
import { NODE_ENV } from "../config/config.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
    },
    colors: {
        fatal: "bold red",
        error: "magenta",
        warning: "bold yellow",
        info: "blue",
        debug: "gray",
    }
}
let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        colors: customLevels.colors
    }),
    winston.format.label({
        label:'[LOGGER]'
    }),
    winston.format.timestamp({
        format:"YY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports : [
        new winston.transports.Console({ 
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors}),
                winston.format.simple()
            )
    }),
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    transports : [
        new winston.transports.Console({ 
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),
                //winston.format.simple()
                alignColorsAndTime
            )
    }),
        new winston.transports.File({ 
            filename: "./errors.log", 
            level: "error",
            timestamp: function(){return Date.now();},
            format: winston.format.combine(
                winston.format.timestamp({
                    format:"YY-MM-DD HH:mm:ss"
                }),
                winston.format.label({
                    label:'[LOGGER]'
                }),
                winston.format.printf(
                    info => `${info.label} ${info.timestamp}  ${info.level} : ${info.message}`
                )
            )
        }),
    ]
});

const loggerLevelEnv = {
    production: prodLogger,
    development: devLogger
}

export function setLogger (req, res, next) {
    req.logger = loggerLevelEnv[NODE_ENV];
    next();
};

export const getLogger = () => {
    if (NODE_ENV == "production") {
        return prodLogger;
    } else {
        return devLogger;
    }
};