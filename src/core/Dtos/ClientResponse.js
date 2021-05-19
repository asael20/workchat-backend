
class ClientResponse {

    constructor(code, message, data = [], succes=false) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.succes = succes;
    }

    succes = false
    code = 0;
    message = "";
    data = null;

}

module.exports = ClientResponse;