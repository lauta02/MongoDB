class UserDTO {
    constructor(userData) {
        this.userId = userData._id;
        this.firstName = userData.first_name;
        this.lastName = userData.last_name;
        this.dateOfBirth = userData.date_of_birth;
        this.emailAddress = userData.email;
        this.userPassword = userData.password;
        this.userCart = userData.cart;
        this.userRole = userData.role;
        this.lastConnection = userData.last_connection;
        this.userDocuments = userData.documents;
    }
}

module.exports = UserDTO;