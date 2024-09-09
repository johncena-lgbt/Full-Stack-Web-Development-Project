//Required modules
const express = require('express');
const messageController = require('../controllers/messageController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

//Create router
const router = express.Router();

//Define routes

//Read all messages
router.get('/', jwtMiddleware.verifyToken, messageController.readAllMessage);

//Create a message
router.post('/', jwtMiddleware.verifyToken ,messageController.createMessage);

//Read message by id
router.get('/:id', jwtMiddleware.verifyToken, messageController.readMessageById);

//Update message by id
router.put('/:id', jwtMiddleware.verifyToken, messageController.updateMessageById);

//Delete message by id
router.delete('/:id', jwtMiddleware.verifyToken, messageController.deleteMessageById);



//Export routers
module.exports = router