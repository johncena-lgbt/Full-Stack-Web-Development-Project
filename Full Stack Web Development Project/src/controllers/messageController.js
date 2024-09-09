const messageModel = require('../models/messageModel');

// To check if username exists and matches the logged-in user
module.exports.checkUsername = (req, res, next) => {
    // Extract username from the request body
    const requestUsername = req.body.username;
    // Extract username from the verified token stored in res.locals
    const tokenUsername = res.locals.username;

    console.log("requestUsername:", requestUsername);
    console.log("tokenUsername:", tokenUsername);

    // Check if the username from the token matches the username in the request body
    if (tokenUsername !== requestUsername) {
        return res.status(403).json({
            message: "You can only create a message with your own username"
        });
    } else {
        // If the username matches, continue with the next middleware
        next();
    }
};
//To create a message
module.exports.createMessage = (req, res, next) => {
    if(req.body.message_text == undefined || req.body.message_text == "")
    {
        res.status(400).json({
            status:400,
            error: "Error: message_text is undefined or empty"
        })
        return;
    }else if(req.body.username == undefined || req.body.username == ""){
        res.status(400).json({
            status:400,
            error: "Error: username is undefined or empty"

        })
    }else if(req.body.title == undefined || req.body.title == ""){
        res.status(400).json({
            status:400,
            error: "Error: title is undefined or empty"
        })
        return;
    }

    const data = {
        title: req.body.title,
        message_text: req.body.message_text,
        username: req.body.username  
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    messageModel.insertSingle(data, callback);
}

//To read message by id
module.exports.readMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    messageModel.selectById(data, callback);
}

//To read all messages
module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    messageModel.selectAll(callback);
}

//To update message by id
module.exports.updateMessageById = (req, res, next) => {
    if(req.params.id == undefined)
    {
        res.status(400).json({
            status:400,
            error: "Error: id is undefined"
        })
        return;
    }
    else if(req.body.message_text == undefined || req.body.message_text == "")
    {
        res.status(400).json({
            status:400,
            error: "Error: message_text is undefined or empty"
        })
        return;
    }
    else if(req.body.username == undefined || req.body.username == ""){
        res.status(400).json({
            status:400,
            error: "Error: username is undefined or empty"

        })
    }else if(req.body.title == undefined || req.body.title == ""){
        res.status(400).json({
            status:400,
            error: "Error: title is undefined or empty"
        })
        return;
    }

    const data = {
        id: req.params.id,
        title: req.body.title,
        message_text: req.body.message_text,
        username: req.body.username  
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    messageModel.updateById(data, callback);
}

//To delete message by id
module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    messageModel.deleteById(data, callback);
}