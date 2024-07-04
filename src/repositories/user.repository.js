const UserDTO = require('../dto/user.dto')

class UserDatabaseHandler{
    constructor(databaseAccessor){
        this.databaseAccessor = databaseAccessor
    }

    async registerNewUser(userData){
        const userDTO = new UserDTO(userData)
        const result = await this.databaseAccessor.addUserToDatabase(userDTO)
        return result
    }

    async retrieveAllUsers(){
        const result = await this.databaseAccessor.getAllUsers()
        return result
    }

    async fetchUserById(userId){
        const result = await this.databaseAccessor.getUserById(userId)
        return result
    }

    async findUserByEmail(userEmail){
        const result = await this.databaseAccessor.getUserByEmail(userEmail)
        return result
    }

    async authenticateUser(userEmail, userPassword){
        const result = await this.databaseAccessor.getUserByLogin(userEmail, userPassword)
        return result
    }

    async findUserByCartId(cartId){
        const result = await this.databaseAccessor.getUserByCartId(cartId)
        return result
    }

    async updateUserProfile(userId, updatedData){
        const result = await this.databaseAccessor.updateUserProfile(userId, updatedData)
        return result
    }

    async removeUser(userId){
        const result = await this.databaseAccessor.deleteUserFromDatabase(userId)
        return result
    }

    async uploadUserDocument(userId, documentName, documentPath){
        const result = await this.databaseAccessor.updateUserDocuments(userId, documentName, documentPath)
        return result
    }
    
    async findInactiveUsers(criteria){
        const result = await this.databaseAccessor.getInactiveUsersFromDatabase(criteria)
        return result
    }
}

module.exports = UserDatabaseHandler