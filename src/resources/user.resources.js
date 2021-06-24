const userResource = require('express').Router();
const { _userService }  = require('../core/services');
 

/**
 * 
 * @description Create a new User
 */
userResource.post('/', async (req, res) => {
    
    let result= await _userService.addUser(req.body);
    res.status(result.code).json(result);
});

/**
 * @description Get one user by his Email
 */
userResource.get('/:email', async (req, res, next) => {
    const result = await _userService.getUserByEmail(req.params.email);
    res.status(result.code).json(result)
});


userResource.get('/:email/contact-requests', async (req, res, next) => {
    const result = await _userService.listContactRequests({userEmail:req.params.email, type:req.query.type});
    res.status(result.code).json(result)
});


userResource.get('/:email/rooms', async (req, res, next) => {
    const {email} = req.params;
   
    const result = await _userService.listOwnRooms({userEmail: email});
    res.status(result.code).json(result)
});










module.exports = userResource;