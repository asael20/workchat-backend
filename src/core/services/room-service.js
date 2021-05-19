const _unitOfWork = require('../../repositories');
const User = require('../entities/User');
const WorkRoom = require('../entities/WorkRoom');
const { notFound, ok, forbiddenMessage } = require('../tools/http-response');


class RoomService {


    async addRoom({title, description, ownerEmail}) {
        
        const {data:usersFromDb} = await _unitOfWork.users.selectOneUser(ownerEmail);

        if(Array.from(usersFromDb).length == 0){
            return notFound('user not found');
        }

        const userData = usersFromDb[0];
        const user = new User(userData['id'],userData['name'], userData['lastName'], ownerEmail, null);
        
        const resp = await user.registerRoom(title, description);
        return resp;
    }


    async addParticipant({userEmail, role, roomId, ownerEmail}) {
        
        let {data: usersFromDb } = await _unitOfWork.users.selectOneUser(ownerEmail)
        
        if(Array.from(usersFromDb).length == 0) 
            return "User not found";

        const userData = usersFromDb[0];
        const user = new User(userData['id'],userData['name'], userData['lastName'], ownerEmail, null);
                
        await user.getOwnRooms();
        const roomData = user.ownRooms.find(room => room.id == roomId);

        if(!roomData) {
            return forbiddenMessage("you have not pemisionn for add participant into this room");
        }
        
        const room = new  WorkRoom(roomData['title'], roomData['description'], roomData['ownerId'], roomData['id']);
        const resp = await room.addParticipant(userEmail, role);

        return resp;
    }


    

        

}

module.exports = RoomService;