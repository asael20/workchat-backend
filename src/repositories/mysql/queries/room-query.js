const knex = require('../config/connection')
const DatabaseResponse = require("../../../core/Dtos/DatabaseResponse");

class RoomQuery {

    async insertRoom ({title, description, ownerId}) {

        try {
            const resp = await knex('rooms').insert({title, description, ownerId});
            return DatabaseResponse.fromQuery(`Inserted`)
        } catch (error) {
            return DatabaseResponse.fromError(error);
        }
    }


    async selectByOwnerId (ownerId) {

        let rooms = await knex('rooms').where({ownerId});
        return DatabaseResponse.fromQuery(rooms)
    }


    async insertParticipant(userId, role, roomId) {

        try {
            const resp = await knex('participants').insert({userId, role, roomId})
            return DatabaseResponse.fromQuery(`participant Inserted into room`)
        } catch (error) {
            return DatabaseResponse.fromError(error);
        }

    }





}




module.exports = RoomQuery;