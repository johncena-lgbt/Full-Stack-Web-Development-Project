const taskModel = require('../models/taskModel')

//To read all tasks
module.exports.readAllTasks = (req,res,next) => {
    const callback = (error, results, fields) => {
        if(error) {
            res.status(500).json(error)
        }else {
            res.status(200).json(results)
        }
    }
    taskModel.readAllTasks(callback)
}

//To delete task
module.exports.deleteTaskById = (req,res,next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error)
        }else {
            if(results.affectedRows == 0) {
                res.status(404).json ({
                    status: 404,
                    message: "Task not found",
                }) 
            }else {
                res.status(204).json({})
            }
        }
    }
    taskModel.deleteTaskById(data,callback)
}

//To read task by id
module.exports.readTaskById = (req,res,next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error,results,fields) => {
        if(error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error)
        }else {
            if(results.length == 0) {
                res.status(404).json({
                    status:404,
                    message:'Task not found'
            })
            }else {
                res.status(200).json(results[0])
            }
        }
    }
    taskModel.readTaskById(data,callback)
}

//To update task
module.exports.updateTaskById = (req,res,next) => {
    let data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    if(data.title === undefined || data.description === undefined || data.points === undefined) {
        res.status(400).json({
            status:400,
            message: "Error: Title or description or points is missing from body"
        })
        return
    }
    const callback = (error,results,fields) => {
        if(error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error)
        }else {
            if(results.affectedRows == 0) {
                res.status(404).json({
                    status:404,
                    message:"Task not found"
                })
            }else{
                data = {
                    task_id: parseInt(req.params.task_id),
                    title: req.body.title,
                    description: req.body.description,
                    points: req.body.points            
                }
                res.status(200).send(data)
            }
        }
    }
    taskModel.updateTaskById(data,callback)
}

//To create new task
module.exports.createNewTask = (req,res,next) => {
    //Body
    let data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    //Error handling num 1 too see if any of the necessary is missing
    if(data.title === undefined || data.description === undefined || data.points === undefined) {
        res.status(400).json({
            message:"Title or description or points is missing in the body"
        })
        return
    }
    const callback = (error,results,fields) => {
        if(error) {
            res.status(409).json(error);
        }else{
            data = {
                task_id: results.insertId,
                title: req.body.title,
                description: req.body.description,
                points: req.body.points
            }
            res.status(201).send(data)
        }
    }
    taskModel.createNewTask(data,callback)
}

