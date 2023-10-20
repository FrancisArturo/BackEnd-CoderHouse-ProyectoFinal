import { ADMIN_EMAIL, ADMIN_PASSWORD, EMAIL } from "../config/config.js";
import UserDTO from "../dao/DTOs/user.dto.js";
import { CartsService, UsersService } from "../repositories/index.js";
import {generateJWT} from "../utils/jwt.js";
import { transporter } from "../utils/transporter.js";


export default class SessionController {
    usersService;
    CartsService;
    constructor() {
        this.usersService = UsersService; 
        this.cartsService = CartsService;
    }
    uploadDocumentController = async (req, res) => {
        try {
            let docUploaded = false;
            const { uid } = req.params;
            if(!req.files) {
                return res.status(400).send({status: "error", message: "upload error"})
            }
            for (let index = 0; index < req.files.length; index++) {
                const element = req.files[index];
                let doc;
                switch (index) {
                    case 0:
                        doc = {
                            name: "IdDoc",
                            reference: element.path
                        }
                        await this.usersService.addDocumentUser(uid, doc);
                        break;
                    case 1:
                        doc = {
                            name: "DomicileDoc",
                            reference: element.path
                        }
                        await this.usersService.addDocumentUser(uid, doc);
                        break;
                    case 2:
                        doc = {
                            name: "AccountStateDoc",
                            reference: element.path
                        }
                        await this.usersService.addDocumentUser(uid, doc);
                        break;
                    default:
                        break;
                }
            }
            const user = await this.usersService.getUserById(uid);
            if (user.documents.lenght < 2) {
                return res.render("premium", {error: "upload documents error, please try again"});
            } else {
                docUploaded = true;
                return res.render("premium", {docUploaded});
            }
        } catch (error) {
            return error
        }
    }
    createUserController = async (req, res) => {
        try {
            const userExist = await this.usersService.getUserByEmail(req.body);
            if (userExist) {
                return res.status(400).json({message: "User already exists"});
            }
            const newUser = await this.usersService.createUser(req.body);
            const cartUser = await this.cartsService.addCart();
            const cartUserId = cartUser._id;
            await this.usersService.updateUserById(newUser._id, {carts : cartUserId });
            const newUserUpdated = await this.usersService.getUserById(newUser._id);
            return res.json({message: "Successfully registered user", newUserUpdated});
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    getUserController = async (req, res) =>{
        try {
            const usersReturn = [];
            const users = await this.usersService.getUsers();
            if (!users) {
                return res.status(404).json({error: "No users found"});
            }
            users.forEach(element => {
                const user = new UserDTO(element);
                usersReturn.push(user);
            });
            return res.status(200).render("users", { users: usersReturn });
        } catch (error) {
            return res.status(400).json({error: error});
        }
    }

    loginUserController = async (req, res) => {
        try {
            const userSubmitted = req.body;
            if (userSubmitted.email == ADMIN_EMAIL && userSubmitted.password == ADMIN_PASSWORD) {
                const signUser = {
                    firstName: "adminCoder",
                    email: ADMIN_EMAIL,
                    role: "admin",
                };
                const token = generateJWT({...signUser});
                return res.cookie("cookieToken", token, {
                    maxAge:60*60*1000,
                    httpOnly: true
                }).redirect('/home');
            }
            const userExist = await this.usersService.getUserByEmail(userSubmitted);
            if (!userExist) {
                return res.status(400).render('login', {error: "User not found"});
            }
            const pswControl = await this.usersService.comparePsw(userSubmitted);
            if (!pswControl) {
                return res.status(400).render('login', {error: "Incorrect password"});
            }
            const signUser = {
                user: userExist._id,
                firstName: userExist.firstName,
                lastName: userExist.lastName,
                email: userExist.email,
                role: userExist.role,
            };
            const token = generateJWT({...signUser});
            await this.usersService.updateUserById(signUser.user, { lastConnection: Date.now() });
            res.cookie("cookieToken", token, {
                maxAge:60*60*1000,
                httpOnly: true
            }).redirect('/home');
        } catch (error) {
            return res.status(400).json({ message: error.message});
        }
    }
    logoutUserController = async (req, res) => {
        try {
            const { user } = req.user;
            await this.usersService.updateUserById(user.user, { lastConnection: Date.now() });
            res.clearCookie("cookieToken");
            return res.redirect('/login');
        } catch (error) {
            return console.log(error);
        }
    }
    getUserByIdController = async (req, res) => {
        try {
            const userId = req.user;
            const cart = await this.usersService.getUserById(userId.user.user);
            return res.send(cart);
        } catch (error) {
            return console.log(error);
        }
    }

    recoverPasswordController = async (req, res) => {
        try {
            const userExist = await this.usersService.getUserByEmail(req.body);
            if (!userExist) {
                return res.status(400).json({ message: "User not found" });
            }
            const signUser = {
                email: userExist.email,
                role: "pswRecover"
            };
            const token = generateJWT({...signUser});
            const sendEmail = transporter.sendMail({
                from: EMAIL,
                to: userExist.email,
                subject: `Recover your password`,
                html: `
                <div>
                    <h2>Complete your password recover</h2>
                    <div>
                        <p>Follow the next link to continue the process</p>
                        <br>
                        <br>  
                        <a href="http://localhost:8000/recover/${token}">CLICK HERE</a>
                        <br>
                        <br>
                        <p>This link has a duration of 30 min, After this you will have to request a new link</p>
                    </div>
                </div>
                `,
            });
            return res.cookie("cookieToken", token, {
                maxAge:60*60*1000,
                httpOnly: true
            }).json({ message: "an email was sent"});
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    recoverCompletePswController = async (req, res) => {
        try {
            const userEmail = req.user.user.email;
            const psw = req.body.password;
            const user = {
                email: userEmail,
                password: psw
            }
            const pswControl = await this.usersService.comparePsw(user);
            if (pswControl) {
                return res.status(400).json({ message: "the password must be different from the previous one" });
            }
            const updatePsw = await this.usersService.recoverCompletePsw(user);
            const currentUser = new UserDTO(updatePsw);
            res.clearCookie("cookieToken");
            return res.json({message: "Password update successfully", currentUser});
        } catch (error) {
            
        }
    }
    updateUserRoleController = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await this.usersService.getUserById(uid);
            if (!user) {
                return res.json({ message: "user not found" });
            }
            if (user.role == "user") {
                const updateUser = await this.usersService.updateUserById(uid, { role: "premium" });
                res.clearCookie("cookieToken");
                const userUpdated = await this.usersService.getUserById(uid);
                const signUser = {
                    user: userUpdated._id,
                    firstName: userUpdated.firstName,
                    lastName: userUpdated.lastName,
                    email: userUpdated.email,
                    role: userUpdated.role,
                };
                const token = generateJWT({...signUser});
                    return res.cookie("cookieToken", token, {
                        maxAge:60*60*1000,
                        httpOnly: true
                    }).redirect('/home');
            } else if (user.role == "premium") {
                const updateUser = await this.usersService.updateUserById(uid, { role: "user" });
                res.clearCookie("cookieToken");
                const userUpdated = await this.usersService.getUserById(uid);
                const signUser = {
                    user: userUpdated._id,
                    firstName: userUpdated.firstName,
                    lastName: userUpdated.lastName,
                    email: userUpdated.email,
                    role: userUpdated.role,
                };
                const token = generateJWT({...signUser});
                    return res.cookie("cookieToken", token, {
                        maxAge:60*60*1000,
                        httpOnly: true
                    }).redirect('/home');
            } else {
                return res.json({ message: "Unauthorized to update"});
            }
        } catch (error) {
            res.status(400).json({ message: error.message }); 
        }
    }
    updateAdminRoleControler = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await this.usersService.getUserById(uid);
            if (!user) {
                return res.json({ message: "user not found" });
            }
            if (user.role == "user") {
                await this.usersService.updateUserById(uid, { role: "premium" });
            } else if (user.role == "premium") {
                await this.usersService.updateUserById(uid, { role: "user" });
            }
            return res.status(200).json({message: "Role change successfully"});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    currentController = async (req, res) => {
        const { user }  = req.user
        if (user.role == "admin") {
            const current = {
                _id: "",
                firstName: "admin",
                lastName: "coder",
                email: "",
                role: "admin"
            }
            const currentUser = new UserDTO(current);
            return res.json({message: "Current access information", currentUser});
        } else {
            const userFound = await this.usersService.getUserById(user.user);
            const currentUser = new UserDTO(userFound);
            return res.json({message: "Current access information", currentUser});
        }
        
    }
    deleteUserByIdController = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await this.usersService.getUserById(uid);
            if (!user) {
                return res.json({ message: "user not found" });
            }
            await this.cartsService.deleteCartById(user.carts);
            const deleteUser = await this.usersService.deleteUserById(uid);
            return res.json({message: "User delete successfully", deleteUser});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    githubLoginController  = async (req, res) => {
        try {
            const userLogin = req.user;
            const signUser = {
                user: userLogin._id,
                firstName: userLogin.firstName,
                lastName: userLogin.lastName,
                email: userLogin.email,
                role: userLogin.role,
            };
            const token = generateJWT({...signUser});
                return res.cookie("cookieToken", token, {
                    maxAge:60*60*1000,
                    httpOnly: true
                }).redirect('/home');
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}