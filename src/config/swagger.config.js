import __dirname from "../dirname.js";

export const swaggerOpt = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "documentacion api ecommerce",
            description: "API ecommerce",
            version: "1.0.0"
        }
    },
    apis:[`${__dirname}/docs/**/*.yml`]
}