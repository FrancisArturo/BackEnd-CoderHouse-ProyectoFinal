import { Router } from "express";
import passport from "passport";
import handlePolicies from "../middleware/handle-police.middleware.js";
import SessionController from "../controllers/session.controller.js";
import { uploader } from "../middleware/uploader.middleware.js";




export default class sessionRoutes {
    path = "/session";
    router = Router();
    sessionController = new SessionController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.sessionController.createUserController);
        this.router.post(`${this.path}/login`, this.sessionController.loginUserController);
        this.router.get(`${this.path}/logout`, handlePolicies(["admin", "user", "premium"]), this.sessionController.logoutUserController);
        this.router.post(`${this.path}/recover`, this.sessionController.recoverPasswordController);
        this.router.put(`${this.path}/recover/complete`, handlePolicies(["pswRecover"]), this.sessionController.recoverCompletePswController);
        this.router.get(`${this.path}/users/:uid/premium`, this.sessionController.updateUserRoleController);
        this.router.put(`${this.path}/users/:uid/role`, handlePolicies(["admin"]), this.sessionController.updateAdminRoleController);
        this.router.post(`${this.path}/users/:uid/documents`, uploader.array('file'), this.sessionController.uploadDocumentController);
        this.router.delete(`${this.path}/users/:uid`, handlePolicies(["admin"]), this.sessionController.deleteUserByIdController);
        this.router.get(`${this.path}/users`, handlePolicies(["admin"]), this.sessionController.getUsersController);
        this.router.delete(`${this.path}/users`, handlePolicies(["admin"]), this.sessionController.deleteUsersInactiveController);
        this.router.get(`${this.path}/user`, handlePolicies(["admin", "user", "premium"]), this.sessionController.getUserByIdController);
        this.router.get(`${this.path}/github`, passport.authenticate("github", { scope: [ 'user:email' ], session: false}));
        this.router.get(`${this.path}/github/callback`, passport.authenticate("github", { failureRedirect: "/api/v1/session/failedlogin", session: false }), this.sessionController.githubLoginController);
        this.router.get(`${this.path}/current`,  handlePolicies(["admin", "user", "premium"]), this.sessionController.currentController);
        this.router.get(`${this.path}/users/orders`,  handlePolicies(["user", "premium"]), this.sessionController.getOrdersByEmailController);
    }
}

