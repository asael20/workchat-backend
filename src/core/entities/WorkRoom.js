const _unitOfWork = require('../../repositories');
const { notFound, badResquest, created } = require('../tools/http-response');

class WorkRoom {

    #id = 0;
    title = null;
    description = null;
    participants = [];
    ownerId = null;

    constructor(title, description, ownerId, id=null) {
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.#id = id;
    }

    get id () { return this.#id }

    async addParticipant(userEmail, role) {
        
        const {data: usersFromDb } = await _unitOfWork.users.selectOneUser(userEmail);

        if(usersFromDb.length == 0) {
           
            return notFound('the user that you want to add not exist so he cant be added');
        }

        let {success, mesage} = await _unitOfWork.rooms.insertParticipant(usersFromDb[0].id, role, this.#id);
                
        if(!success) {
            return badResquest("Bad request, check your data");
        }


        return created(`user ${userEmail} has been added succesfully into room`);
    }





}

module.exports = WorkRoom;