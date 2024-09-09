const pool = require('../services/db');

//To read all tasks
module.exports.readAllTasks = (callback) => {
    const SQLSTATEMENT = 
    `
    SELECT * FROM task
    `

    pool.query(SQLSTATEMENT, callback)
}

//To delete task
module.exports.deleteTaskById = (data,callback) => {
    const SQLSTATEMENT = 
    `
    DELETE task, Taskprogress
    FROM task
    LEFT JOIN Taskprogress ON task.task_id = Taskprogress.task_id
    WHERE task.task_id = ?;
    `
    const VALUES = [data.task_id]

    pool.query(SQLSTATEMENT,VALUES,callback)
}

//To read task by id
module.exports.readTaskById = (data,callback) => {
    const SQLSTATEMENT = 
    `
    SELECT * FROM task
    WHERE task_id = ?
    `

    const VALUES = [data.task_id]

    pool.query(SQLSTATEMENT,VALUES,callback)
}

//To update task by id
module.exports.updateTaskById = (data,callback) => {
    const SQLSTATEMENT = 
    `
    UPDATE task
    SET title=?, description = ?, points = ?
    WHERE task_id = ?
    `
    const VALUES = [data.title, data.description, data.points, data.task_id]

    pool.query(SQLSTATEMENT,VALUES,callback)
}

//To create new task
module.exports.createNewTask = (data,callback) => {
    const SQLSTATEMENT = 
    `
    INSERT INTO task (title, description, points)
    VALUES(?,?,?)
    `

    VALUES = [data.title,data.description,data.points]

    pool.query(SQLSTATEMENT,VALUES,callback)
}
