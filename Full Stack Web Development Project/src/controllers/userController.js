const userModel = require("../models/userModel");
const path = require('path');

//////////////////////////////////////////////////////
//Check if email or username already exist (register feature) t1
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email
    }

    if (!req.body.username || !req.body.email) {
        res.status(400).json({ Error: "Missing required data." });
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectByUsernameOrEmail:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Username or email already exists"
                });
            } else {
                next();
            }
        }
    }

    userModel.chkExist(data, callback);
}

//////////////////////////////////////////////////////
//Create new user (register feature) t1
//////////////////////////////////////////////////////
module.exports.registerUser = (req,res,next) => {

    let savedImagePath = '';
    if (req.file) {
        // Use only the file name and prepend the 'images/' directory
        savedImagePath = 'images/' + path.basename(req.file.path);
    }else{
        savedImagePath = 'images/defaultPicture.png';
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash,
        profile_image: savedImagePath
    }

    res.locals.username = data.username;

    if(!data.username || !data.email || !data.password || !data.profile_image){
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.userId = results.insertId;
            res.locals.username = data.username;
            
            res.locals.message = "User " + data.username + " created successfully.";
            next();
        }
    }
    userModel.insertSingle(data, callback);
}

//To help the user login
module.exports.login = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username
    }

    res.locals.username = req.body.username;

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else if (results.length == 1) {
            res.locals.userId = results[0].user_id;
            res.locals.hash = results[0].password;
            next();
        } else if (results.length > 1) {
            res.status(409).json({
                message: "Username already exists"
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    }
    userModel.selectUserByUsernameAndPassword(data, callback);
}


//To get user by id
module.exports.getUserById = (req,res,next) => {
    const data = {
        user_id: res.locals.userId
    }
    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error readUserById:", error)
            res.status(500).json(error)
        }else {
            if(results.length == 0){
                res.status(404).json({
                    status: 404,
                    message:"User not found"
                })
            }else{
                res.locals.hash = results[0].password
                const data = {
                    user_id: parseInt(req.params.user_id),
                    username: results[0].username,
                    email: results[0].email,
                    total_points: parseInt(results[0].total_points),
                    profile_image: results[0].profile_image
                }            
                res.status(200).send(data)
            }
        }
    }
    userModel.readUserById (data,callback)
}

//To change password for the user
module.exports.changePassword = (req,res,next) => {
    const data = {
        user_id: res.locals.userId,
        password: res.locals.hash
    }
    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error updatePassword:", error)
            res.status(500).json(error)
        }else {
            res.status(200).json({
                status: 200,
                message: "Password changed successfully"
            })
        }
    }
    userModel.updatePassword(data,callback)
}

//To read user hashed password
module.exports.readUserPassword = (req,res,next) => {
    const data = {
        user_id: res.locals.userId
    }
    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error readUserPassword:", error)
            res.status(500).json(error)
        }else {
            res.locals.hash = results[0].password
            next()
        }
    }
    userModel.readUserPassword(data,callback)
}

//To update user details (email, username)
module.exports.updateUserDetails = (req,res,next) => {
    const data = {
        user_id: res.locals.userId,
        username: req.body.username,
        email: req.body.email
    }
    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error updateUserDetails:", error)
            res.status(500).json(error)
        }else {
            res.status(200).json({
                status: 200,
                message: "User details changed successfully"
            })
        }
    }
    userModel.updateUserDetails(data,callback)
}

//To update user profile image
module.exports.updateProfileImage = (req,res,next) => {
    let savedImagePath = '';
    if (req.file) {
        // Use only the file name and prepend the 'images/' directory
        savedImagePath = 'images/' + path.basename(req.file.path);
    }
    
    const data = {
        user_id: res.locals.userId,
        profile_image: savedImagePath
    }
    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error updateProfileImage:", error)
            res.status(500).json(error)
        }else {
            res.status(200).json({
                status: 200,
                message: "Profile image changed successfully"
            })
        }
    }
    userModel.updateProfileImage(data,callback)
}

//To get all users pets
module.exports.getAllUserPets = (req,res,next) => {
    const data = {
        user_id: res.locals.userId
    }
    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error selectAllUserPets:", error)
            res.status(500).json(error)
        }else {
            res.status(200).send(results)
        }
    }
    userModel.selectAllUserPets(data,callback)
}

//To get all users tasks
module.exports.getAllUserTasks = (req,res,next) => {
    const data = {
        user_id: res.locals.userId
    }
    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error selectAllUserTasks:", error)
            res.status(500).json(error)
        }else {
            res.status(200).send(results)
        }
    }
    userModel.selectAllUserTasks(data,callback)
}