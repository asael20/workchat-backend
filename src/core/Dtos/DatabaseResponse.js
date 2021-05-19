class DatabaseResponse {

    success = false;
    mesage = null;
    data = [];
    #err = null


    static fromQuery(data){
        let res = new DatabaseResponse();
        res.success = true;
        res.data = data;

        return res;
    }

    static fromIUD() {
        let res = new DatabaseResponse();
        res.success = true;

        return res;
    }

    static fromError(reason) {
        let res = new DatabaseResponse();
       res.mesage = reason;

       return res;
    }

}


module.exports = DatabaseResponse;