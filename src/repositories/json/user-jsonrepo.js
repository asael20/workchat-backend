const DatabaseResponse = require("../../core/Dtos/DatabaseResponse");
const { getRepo, updateRepo } = require("./jsontools");


class UserJsonRepository {

    async insertUser ({id, name, lastName, email, password}) {

        let users = await getRepo('users')
        let duplicated = Array.from(users).find((user) => user.email == email || user.id == id)

        if(duplicated)
            return DatabaseResponse.fromError("duplicated user :(");

        users.push({id, name, lastName, email, password});
        let count = await updateRepo('users', users);

        return DatabaseResponse.fromQuery(`Inserted, now there are ${count} users`)
    }


    async selectOneUser (email) {
        let users = Array.from(await getRepo('users'))
        const userSelected  = users.filter(user => user.email == email)
        return DatabaseResponse.fromQuery(userSelected)
    }


    async insertContactRequest ({userAsk, userTocontact}) {

        let relations = await getRepo('relations')
        let duplicated = Array.from(relations).find((relation) => {
            
            let {user_a, user_b, status} = relation;

            if((userAsk == user_a || userAsk == user_b) && (userTocontact == user_a || userTocontact == user_b) && ['connected', 'pending'].includes(status))
                return true;
        });

        if(duplicated)
            return DatabaseResponse.fromError("this request already exist:(");

        relations.push({user_a: userAsk, user_b: userTocontact, status:'pending', id: (relations.length+1)});
        let count = await updateRepo('relations', relations);

        return DatabaseResponse.fromQuery(`request to conect was submited succesfully`)
    }


    async deleteContactRequest (contactRequestId) {

        let relations = await getRepo('relations')
        let result = Array.from(relations).filter((relation) => relation.id != contactRequestId);

        let count = await updateRepo('relations', result);

        return DatabaseResponse.fromQuery(`request have been removed`)
    }


    async updateStatusContactRequest (contactRequestId) {

        let relations = await getRepo('relations')
        let result = Array.from(relations).map((relation) => {

           if( relation.id == contactRequestId)
                relation.status = 'connected'
    
            return relation;
        });

        let count = await updateRepo('relations', result);

        return DatabaseResponse.fromQuery(`request have been removed`)
    }


    async selectContactRequest (contactRequestId) {
        let relations = Array.from(await getRepo('relations'))
        const userSelected  = relations.filter(relation => relation.id == contactRequestId)
        return DatabaseResponse.fromQuery(userSelected)
    }



    async selectContacts (userEmamil) {
        let relations = Array.from(await getRepo('relations'))
        const contacts  = relations.filter(relation => {
            let {user_a, user_b} = relation;
            
            return relation.status == 'connected' && [user_a, user_b].includes(userEmamil);
        });

        return DatabaseResponse.fromQuery(contacts)
    }

    async selectContactRequests (userEmamil, type='received' ) {
        let relations = Array.from(await getRepo('relations'))

        const requestSent = (relation) => relation.status == 'pending' && relation.user_a == userEmamil;
        const requestReceived = (relation) => relation.status == 'pending' && relation.user_b == userEmamil;
        let condition = (type == 'sent')? requestSent : requestReceived;
        
        const contactsRequests  = relations.filter(condition);

        return DatabaseResponse.fromQuery(contactsRequests)
    }

    
}

module.exports = UserJsonRepository;