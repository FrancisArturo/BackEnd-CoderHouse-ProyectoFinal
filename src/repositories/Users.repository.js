

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getUsers = async () => {
        let result = await this.dao.getUsersDao();
        return result;
    }
    getUserByEmail = async (user) => {
        let result = await this.dao.getUserByEmailDao(user);
        return result;
    }
    comparePsw = async (user) => {
        let result = await this.dao.comparePswDao(user);
        return result;
    }
    createUser = async (user) => {
        let result = await this.dao.createUserDao(user);
        return result;
    }
    loginUser = async (user) => {
        let result = await this.dao.loginUserDao(user);
        return result;
    }
    recoverPassword = async (user) => {
        let result = await this.dao.recoverPasswordDao(user);
        return result;
    }
    recoverCompletePsw = async (email, psw) => {
        let result = await this.dao.recoverCompletePswDao(email, psw);
        return result;
    }
    addDocumentUser = async (uid, doc) => {
        let result = await this.dao.addDocumentUserDao(uid, doc);
        return result;
    }
    updateUserById = async (uid, userUpdate) => {
        let result = await this.dao.updateUserByIdDao(uid, userUpdate);
        return result;
    }
    updateUserByEmail = async (userEmail, userUpdate) => {
        let result = await this.dao.updateUserByEmailDao(userEmail, userUpdate);
        return result;
    }
    getUserById = async (uid) => {
        let result = await this.dao.getUserByIdDao(uid);
        return result;
    }
    deleteUserById = async (uid) => {
        let result = await this.dao.deleteUserByIdDao(uid);
        return result;
    }
}