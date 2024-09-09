const pool = require('../services/db')

module.exports.createNewTaskProgress = (data,callback) => {
    const SQLSTATEMENT =
    `
    INSERT INTO taskprogress (progress_id, user_id, task_id, completion_date, notes)
    VALUES (?,?,?,?,?)
    `

    VALUES = [data.progress_id, data.user_id, data.task_id, data.completion_date, data.notes]
    pool.query(SQLSTATEMENT,VALUES,callback)
}
