import express from "express";
import displayRoutes from "express-routemap";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { PORT, NODE_ENV, API_VERSION, PERSISTENCE } from "./config/config.js";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerOpt } from "./config/swagger.config.js";



export default class App {
    app;
    port; 
    server;
    env;
    specs;

    constructor (routes) {
        this.app = express();
        this.port = PORT;
        this.env = NODE_ENV || "development";
        this.API_VERSION = API_VERSION || "v1";
        this.persistence = PERSISTENCE;
        this.specs = swaggerJSDoc(swaggerOpt);
        
        this.listen();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initHandlebars();
        
    }
    getServer() { 
        return this.server;
    }
    closeServer() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
            done();
        })
    }
    getApp() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cookieParser());
        initializePassport();
        this.app.use(passport.initialize());
    }
    listen() {
        this.server = this.app.listen(this.port, () => {
            displayRoutes(this.app);
            console.log(`Server listening on port ${this.port}`);
            console.log(`Environment: ${this.env}`);
            console.log(`Persistence: ${this.persistence}`);
            return this.server;
        });
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            if (route.path === "/") {
                this.app.use(`/` , route.router);
            } else {
                this.app.use(`/api/${this.API_VERSION}`, route.router);
            }
        });
        this.app.use(`/api/${this.API_VERSION}/docs`, swaggerUiExpress.serve, swaggerUiExpress.setup(this.specs));
    }
    initHandlebars() {
        this.app.engine(
            "handlebars",
            handlebars.engine({
                runtimeOptions: {
                    allowProtoPropertiesByDefault: true,
                    allowProtoMethodsByDefault: true,
                },
            })
        );
        this.app.set("view engine", "handlebars");
        this.app.set("views", __dirname + "/views");
    }
}