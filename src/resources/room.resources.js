const userResource = require('express').Router();
const { _roomService }  = require('../core/services');
 

/**
 * 
 * @description Create a new work room.
 */
userResource.post('/', async (req, res) => {
    
    let result= await _roomService.addRoom(req.body);
    res.status(result.code).json(result);
});

/**
 * @description add a user like participant of a work room.
 */
userResource.post('/:id/participants', async (req, res, next) => {
    const {body} = req;
    body.roomId = req.params.id;

    const result = await _roomService.addParticipant(body);
    res.status(result.code).json(result);
});








module.exports = userResource;