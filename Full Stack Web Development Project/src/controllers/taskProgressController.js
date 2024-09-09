const taskProgressModel = require('../models/taskProgressModel');

module.exports.createTaskProgress = (req, res, next) => {
    let data = {
        user_id: res.locals.userId,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    };

    if (data.completion_date === undefined) {
        res.status(400).json({
            status: 400,
            message: 'Completion_date is missing from the request body'
        });
        return;
    }

    const callback = (createError, createResults, createFields) => {
        if (createError) {
            console.log(createError);
            res.status(500).json(createError);
        } else {
            data = {
                progress_id: createResults.insertId,
                user_id: res.locals.user_id,
                task_id: req.body.task_id,
                completion_date: req.body.completion_date,
                notes: req.body.notes
            };
            res.status(201).json(data);
        }
    };
    taskProgressModel.createNewTaskProgress(data,callback)     
};
