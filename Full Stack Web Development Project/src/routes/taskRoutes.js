//Required Modules
const express = require('express');
const taskController = require('../controllers/taskController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

//Create router
const router = express.Router();

//Define routes

//To read all tasks
router.get('/', jwtMiddleware.verifyToken, taskController.readAllTasks)

//To read task by id
router.get('/:task_id', jwtMiddleware.verifyToken, taskController.readTaskById)

//To delete a task
router.delete('/:task_id', jwtMiddleware.verifyToken, taskController.deleteTaskById)

//To update a task
router.put('/:task_id', jwtMiddleware.verifyToken, taskController.updateTaskById)

//To create a task
router.post('/', jwtMiddleware.verifyToken, taskController.createNewTask)


//Export routers
module.exports = router