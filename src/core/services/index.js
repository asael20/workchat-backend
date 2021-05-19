const RoomService = require('./room-service');
const UserService = require('./user-service');
const RelationService = require('./relation-service');

module.exports._userService = new UserService();
module.exports._roomService = new RoomService();
module.exports._relationService = new RelationService();