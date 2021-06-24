const relationResource = require('express').Router();
const { _relationService }  = require('../core/services');
 



relationResource.post('/', async (req, res, next) => {

    const {userEmailReceive, userEmailSend} = req.body;
    const result = await _relationService.createRelation({userAsk: userEmailSend, userReceive:userEmailReceive})
    res.status(result.code).json(result)
});



relationResource.put('/:id', async (req, res, next) => {

    const {id} = req.params;
    const {decision, userEmail} = req.body;
    const result = await _relationService.changeRelationStatus({contactRequestId: id, userEmail, decision})
    res.status(result.code).json(result)
});















module.exports = relationResource;