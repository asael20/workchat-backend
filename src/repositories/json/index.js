const RoomJsonRepository = require('./room-jsonrepo');
const UserJsonRepository = require('./user-jsonrepo');


const JsonRepository = {
    users : new UserJsonRepository(),
    rooms : new RoomJsonRepository()
}




module.exports = JsonRepository;