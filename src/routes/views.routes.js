import { Router } from "express";
import handlePolicies from "../middleware/handle-police.middleware.js";
import ViewsController from "../controllers/views.controller.js";

export default class viewsRoutes {
    path = "/";
    router = Router();
    viewsController = new ViewsController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`${this.path}`, handlePolicies(["admin", "user", "premium", "public", "pswRecover"]), this.viewsController.defaultViewController);
        this.router.get(`${this.path}login`, handlePolicies(["admin", "user", "premium", "public", "pswRecover"]), this.viewsController.loginViewController);
        this.router.get(`${this.path}register`, this.viewsController.registerViewController);
        this.router.get (`${this.path}recover`,  this.viewsController.recoverViewController);
        this.router.get(`${this.path}users`, handlePolicies(["admin"]), this.viewsController.usersViewController);
        this.router.get (`${this.path}recover/:tid`, handlePolicies(["pswRecover"]), this.viewsController.recoverAuthorizedController);
        this.router.get(`${this.path}home`, handlePolicies(["admin", "user", "premium"]), this.viewsController.homeViewController);
        this.router.get (`${this.path}profile`, handlePolicies(["user", "premium"]), this.viewsController.profileViewController);
        this.router.get (`${this.path}premium`, handlePolicies(["user"]), this.viewsController.premiumUpdateViewController);
        this.router.get(`${this.path}cart/:cid`, this.viewsController.getProductsCartViewController);
        this.router.get (`${this.path}addproduct`, this.viewsController.addProductViewController);
        this.router.get (`${this.path}updateproduct`, this.viewsController.updateProductViewController);
        this.router.get (`${this.path}ticket`, this.viewsController.ticketViewController);
    }
}