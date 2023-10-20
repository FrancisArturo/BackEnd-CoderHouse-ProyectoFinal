export default class UserDTO {
    constructor(user){
        this.user = user._id || "",
        this.firstname = user.firstName,
        this.lastname = user.lastName,
        this.email = user.email,
        this.role = user.role
    }
}