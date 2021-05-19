const knex = require('../config/connection')
const DatabaseResponse = require("../../../core/Dtos/DatabaseResponse");

class UserQuery {

    async insertUser ({id, name, lastName, email, password}) {

        try {
            const resp = await knex('users').insert({id, name, lastName, email, password});
            return DatabaseResponse.fromQuery(`Inserted`);
        } catch(err){
           
            return DatabaseResponse.fromError(err);
        }
    }


    async selectOneUser (email) {
        
        const userSelected = await knex('users').where({email});
        return DatabaseResponse.fromQuery(userSelected)
    }

    async insertContactRequest ({userAsk, userTocontact}) {

       try {


            const duplicated = await knex('relations').where('user_a', 'in', [userAsk, userTocontact]).andWhere('user_b', 'in', [userAsk, userTocontact])


            if(Array.from(duplicated).length > 0) {
                return DatabaseResponse.fromError("This relation already exists...");
            }

            await knex('relations').insert({user_a:userAsk, user_b:userTocontact, status: 'pending'})
            return DatabaseResponse.fromQuery(`request to conect was submited succesfully`);

       }catch(err) {
            return DatabaseResponse.fromError(err);
       }
    }


    async deleteContactRequest (contactRequestId) {

        try {
            const rep = await knex('relations').where({id:contactRequestId}).del();
            return DatabaseResponse.fromQuery(`request have been removed`);

       }catch(err) {
            return DatabaseResponse.fromError(err);
       }
    }


    async updateStatusContactRequest (contactRequestId) {

        try {
            const rep = await knex('relations').where({id:contactRequestId}).update({status:'connected'});
            return DatabaseResponse.fromQuery(`request have been accepted`);

       }catch(err) {
            return DatabaseResponse.fromError(err);
       }

    }

    async selectContactRequest (contactRequestId) {
        const contactReq = await knex('relations').where({id:contactRequestId})
        return DatabaseResponse.fromQuery(contactReq)
    }


    async selectContactRequests (userId, type='received' ) {

        let condition = type == 'sent'? {user_a: userId} : {user_b: userId};
        condition.status = 'pending';
        const contactReqList = await knex('relations').where(condition)

        return DatabaseResponse.fromQuery(contactReqList);
    }

}



module.exports = UserQuery;