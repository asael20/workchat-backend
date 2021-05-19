const _unitOfWork = require('../../repositories');
const { badResquest, created, notFound, forbiddenMessage, ok } = require('../tools/http-response');
const WorkRoom = require('./WorkRoom');


class User {

    ownRooms = [];
    contactRequestsSent = [];
    contactRequestsReceived = []

    constructor(id, name, lastName, email, password){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }


    async registerRoom(title, description) {
        const room = new WorkRoom(title, description, this.id);
        const {success, mesage} = await _unitOfWork.rooms.insertRoom(room)

        if(!success) return badResquest("Bad request, check data");
        return created("Room inserted succesfully");
    }

    
    async getOwnRooms() {
        let { data } = await _unitOfWork.rooms.selectByOwnerId(this.id);
        this.ownRooms = data;
    }
    
    async sendContactRequest(userTocontact) {
        const userFound = (await _unitOfWork.users.selectOneUser(userTocontact)).data[0];
        
        if(!userFound) return notFound('user to contact not found')

        const relation = { userAsk: this.id, userTocontact: userFound.id};
        const rs = await _unitOfWork.users.insertContactRequest(relation);

        if(!rs.success){
            return badResquest('something went wrong, maybe this relations is already created')
        }


        return created('request sent successfully')
    }

    async changeContactRequestStatus(contactRequestId, decision) {
        
        let  {data} = await _unitOfWork.users.selectContactRequest(contactRequestId);

        if(data.length == 0)  return notFound( "This contact request not exist");

        const contactRequest = data[0];

        if(this.id != contactRequest.user_a && this.id != contactRequest.user_b) {
           return forbiddenMessage("you have not acces to this relation")
        }

        if(decision == 0 || decision == -1){
            const rs = await _unitOfWork.users.deleteContactRequest(contactRequestId);
            return ok("Contact request has been removed")
        }


        if(contactRequest.user_b == this.id && decision == 1){
            await _unitOfWork.users.updateStatusContactRequest(contactRequestId);
            return ok('success!! now you are connected')
        }
        else if(contactRequest.user_b != this.id && decision == 1)
        {
            return forbiddenMessage('you have not permission to accept this relation')
        }
        

        return badResquest('invalid action');
    }


    async getMyContactRequests(type) {
        let {data} = await _unitOfWork.users.selectContactRequests(this.id, type);
        return data;
    }

    







}

module.exports = User;