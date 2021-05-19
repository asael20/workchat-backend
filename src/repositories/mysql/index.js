const UserQuery = require('./queries/user-query');
const RoomQuery = require('./queries/room-query');

const MysqlRepository = {
    users : new UserQuery(),
    rooms : new RoomQuery()
}




module.exports = MysqlRepository;