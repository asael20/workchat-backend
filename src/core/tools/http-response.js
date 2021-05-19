const ClientResponse = require("../Dtos/ClientResponse")

module.exports.created = function(message) {
    return new ClientResponse(201, message)
}


module.exports.badResquest = function (message) {
    return new ClientResponse(400, message)
}

module.exports.ok = function(data, message="") {
    return new ClientResponse(200, message, data, true)
}

module.exports.notFound = function(message) {
    return new ClientResponse(404, message)
}

module.exports.forbiddenMessage = function(message) {
    return new ClientResponse(403, message)
}