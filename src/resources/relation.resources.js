const relationResource = require('express').Router();
const { _relationService }  = require('../core/services');
 



relationResource.post('/', async (req, res, next) => {

    const {email, userReceive} = req.body;
    const result = await _relationService.createRelation({userAsk: email, userReceive})
    res.status(result.code).json(result)
});



relationResource.put('/:id', async (req, res, next) => {

    const {id} = req.params;
    const {decision, email} = req.body;
    const result = await _relationService.changeRelationStatus({contactRequestId: id, userEmail: email, decision})
    res.status(result.code).json(result)
});















module.exports = relationResource;