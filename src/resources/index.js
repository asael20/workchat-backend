const router = require('express').Router();

router.use('/users', require('./user.resources'))
router.use('/rooms', require('./room.resources'))
router.use('/relations', require('./relation.resources'))





module.exports = router;