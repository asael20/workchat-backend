const _unitOfWork = require('../../repositories');
const { userTolist } = require('../Dtos/user.dto');
const User = require('../entities/User');
const { created, badResquest, notFound, ok } = require('../tools/http-response');



class UserService {

    /**
     * register a new user
     */
    async addUser({id, name, lastName, email, password}) {

        let user = new User(id, name, lastName, email, password);
        let {data, success, mesage} = await _unitOfWork.users.insertUser(user);
        
        if(!success){
            return badResquest("Bad request, check the data entered");
        }


        return created("user crated succesfully");
    }

    /**
     * Find user by his Email
     */
    async getUserByEmail(email) {
        let {data} = await _unitOfWork.users.selectOneUser(email);
        
        if(data.length == 0) return notFound("Email not registered");
        
        return ok(userTolist(data[0]));
    }
    

    async sendContactRequest ({userAsk, userReceive}) {

        const { data:usersFromDb } = await _unitOfWork.users.selectOneUser(userAsk);
        if(usersFromDb.length == 0){
            return {message: "user not found"};
        }

        let data = usersFromDb[0];
        const user = new User(data['id'], data['name'], data['lastName'], data['email'], null);
        
        let resp = await user.sendContactRequest(userReceive);
        return resp
    }


    async changeContacRequestStatus ({userEmail, contactRequestId, decision}) {

        const { data:usersFromDb } = await _unitOfWork.users.selectOneUser(userEmail);
        if(usersFromDb.length == 0){
            return {message: "user not found"};
        }

        let data = usersFromDb[0];
        const user = new User(data['id'], data['name'], data['lastName'], data['email'], null);
        
        let resp = await user.changeContactRequestStatus(contactRequestId, decision);
        return resp
    }


    async listContactRequests({userEmail, type}) {
        const { data:usersFromDb } = await _unitOfWork.users.selectOneUser(userEmail);

        if(usersFromDb.length == 0){
            return notFound("user not found");
        }

        let data = usersFromDb[0];
        const user = new User(data['id'], data['name'], data['lastName'], data['email'], null);

        const res = await user.getMyContactRequests(type);


        return ok(res);
    }


    async listOwnRooms({userEmail}) {

        const { data:usersFromDb } = await _unitOfWork.users.selectOneUser(userEmail);

        if(usersFromDb.length == 0){
            return notFound("user not found")
        }

        let data = usersFromDb[0];
        const user = new User(data['id'], data['name'], data['lastName'], data['email'], null);
        await user.getOwnRooms();
        
        return ok(user.ownRooms);
    }

    

}

module.exports = UserService;