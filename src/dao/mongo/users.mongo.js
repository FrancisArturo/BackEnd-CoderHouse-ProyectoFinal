import userModel from "../../models/user.models.js";
import { hashPassword, comparePassword } from "../../utils/encrypt.js";


export default class UsersDao {

    getUsersDao = async () => {
        try {
            const UsersFound = await userModel.find();
            return UsersFound;
        } catch (error) {
            throw new Error(error);
        }
    }
    getUserByEmailDao = async (user) => {
        try {
            const userFound = await userModel.findOne({ email: user.email });
            return userFound;
        } catch (error) {
            throw new Error(error);
        }
    }
    comparePswDao = async (user) => {
        try {
            const userFound = await userModel.findOne({ email: user.email });
            const isMatch = await comparePassword(user.password, userFound.password);
            return isMatch;    
        } catch (error) {
            throw new Error(error);
        }
    }
    createUserDao = async (user) => {
        try {
            const pswHashed = await hashPassword(user.password);
            const newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: pswHashed,
                phone: user.phone,
                age : user.age,
                role: "user",
            };
            const userCreated = await userModel.create(newUser);
            return userCreated;
        } catch (error) {
            throw new Error("creating user error");
        }

    }
    recoverPasswordDao = async (user, psw) => {
        try {
            const userFound = await userModel.findOne({ email: user.email });
            const isMatch = await comparePassword(user.password, userFound.password);
            return isMatch;    
        } catch (error) {
            throw new Error(error);
        }
        
    }
    recoverCompletePswDao = async (user) => {
        try {
            const userFound = await userModel.findOne({ email: user.email });
            const pswHashed = await hashPassword(user.password);
            userFound.password = pswHashed;
            await userFound.save();
            return userFound;
        } catch (error) {
            throw new Error("password recovery error");
        }
    }
    updateUserByIdDao = async (uid, userUpdate) => {
        try {
            const updateUser = await userModel.updateOne({ _id: uid }, userUpdate);
            return updateUser;
        } catch (error) {
            throw new Error("Update user error");
        }
    }
    updateUserByEmailDao = async (userEmail, userUpdate) => {
        try {
            const updateUser = await userModel.updateOne({ email: userEmail }, userUpdate);
            return updateUser;
        } catch (error) {
            throw new Error("Update user error");
        }
    }
    addDocumentUserDao = async (uid, doc) => {
        try {
            const userFound = await userModel.findOne({ _id: uid });
            userFound.documents.push(doc);
            await userFound.save();
            return userFound;
        } catch (error) {
            throw new Error(error);
        }
    }
    getUserByIdDao = async (uid) => {
        try {
            const userFound = await userModel.findOne({ _id: uid });
            return userFound;
        } catch (error) {
            return error;
        }
    }
    deleteUserByIdDao = async (uid) => {
        try {
            const userDelete = await userModel.deleteOne({ _id: uid })
            return userDelete;
        } catch (error) {
            throw new Error(error);
        }
    }
}