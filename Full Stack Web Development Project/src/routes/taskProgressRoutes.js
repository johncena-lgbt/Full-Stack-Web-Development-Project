
//Required Modules
const express = require('express');
const taskProgressController = require('../controllers/taskProgressController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');

//Create router
const router = express.Router();

//Define routes

//To post a new task to a user
router.post('/:id', jwtMiddleware.verifyToken, taskProgressController.createTaskProgress);

//Export Routers
module.exports = router