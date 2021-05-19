const _unitOfWork = require('../../repositories');
const { userTolist } = require('../Dtos/user.dto');
const User = require('../entities/User');
const { notFound } = require('../tools/http-response');



class RelationService {
  

    async createRelation ({userAsk, userReceive}) {

        const { data:usersFromDb } = await _unitOfWork.users.selectOneUser(userAsk);
        if(usersFromDb.length == 0){
            return notFound('User not found');
        }

        let data = usersFromDb[0];
        const user = new User(data['id'], data['name'], data['lastName'], data['email'], null);
        
        let resp = await user.sendContactRequest(userReceive);
        return resp
    }


    async changeRelationStatus ({userEmail, contactRequestId, decision}) {

        const { data:usersFromDb } = await _unitOfWork.users.selectOneUser(userEmail);
        if(usersFromDb.length == 0){
            return notFound("user not found")
        }

        let data = usersFromDb[0];
        const user = new User(data['id'], data['name'], data['lastName'], data['email'], null);
        
        let resp = await user.changeContactRequestStatus(contactRequestId, decision);
        return resp
    }
    

}

module.exports = RelationService;