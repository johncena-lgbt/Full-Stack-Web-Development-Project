//Required modules
const express = require('express');
const multer = require('multer');
const userController =  require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddlewre = require('../middlewares/bcryptMiddleware');

const path = require('path');

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'public', 'images'));
    },
    filename: function(req, file, cb) {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        // Only use the desired sub-path and the file name for the database entry
        cb(null, timestamp + file.originalname);
    }
});

// Set up the upload middleware
const upload = multer({ storage: storage });

//Create router
const router = express.Router();

//Define routes

//To register the user
router.post('/register', upload.single('profile_image'), userController.checkUsernameOrEmailExist, bcryptMiddlewre.hashPassword, userController.registerUser, jwtMiddleware.generateToken, jwtMiddleware.sendToken)

//To login the user
router.post('/login', userController.login, bcryptMiddlewre.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken)

//To change password for the user
router.put('/changePassword', jwtMiddleware.verifyToken, userController.readUserPassword, bcryptMiddlewre.changePassword, bcryptMiddlewre.hashNewPassword, userController.changePassword)

//To get user by id
router.get('/:user_id', jwtMiddleware.verifyToken, userController.getUserById)

//To update user details (email, username)
router.put('/:user_id', jwtMiddleware.verifyToken, userController.updateUserDetails)

//To update user profile image
router.put('/profileImage/:user_id', jwtMiddleware.verifyToken, upload.single('profile_image'), userController.updateProfileImage)

//To get all users pets
router.get('/:user_id/pets', jwtMiddleware.verifyToken, userController.getAllUserPets)

//To get all users tasks
router.get('/:user_id/tasks', jwtMiddleware.verifyToken, userController.getAllUserTasks)

//Export routers
module.exports = router