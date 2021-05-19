const DatabaseResponse = require("../../core/Dtos/DatabaseResponse");
const { getRepo, updateRepo } = require("./jsontools");


class RoomJsonRepository {

    async insertRoom ({title, description, ownerId}) {

        let rooms = await getRepo('rooms')
        let duplicated = Array.from(rooms).filter((room) => (room.title == title && room.ownerId == ownerId));

        if(duplicated.length > 0)
            return DatabaseResponse.fromError("this room already exist :(");

        rooms.push({title, description, ownerId, id: (rooms.length+1)});
        let count = await updateRepo('rooms', rooms);

        return DatabaseResponse.fromQuery(`Inserted, now there are ${count} rooms`)
    }

    async insertParticipant(userId, role, roomId) {

        let participants = await getRepo('participants');
        let duplicated = Array.from(participants).filter((part) => (part.userEmail == userId && part.roomId == roomId));

        if(duplicated.length > 0)
            return DatabaseResponse.fromError("this user already exist in this room:(");

        participants.push({userId, role, roomId});
        let count = await updateRepo('participants', participants);

        return DatabaseResponse.fromQuery(`Inserted, now there are ${count} participants in room ${roomId}`)
    }


    async selectByOwnerId (ownerId) {
        let rooms = Array.from(await getRepo('rooms'))
        const roomSelected  = rooms.filter(room => room.ownerId == ownerId)
        return DatabaseResponse.fromQuery(roomSelected)
    }



    
}

module.exports = RoomJsonRepository;