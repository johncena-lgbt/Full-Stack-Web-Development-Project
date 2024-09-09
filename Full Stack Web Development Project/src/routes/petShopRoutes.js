//Required modules
const express = require('express');
const multer = require('multer');
const petShopController = require('../controllers/petShopController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

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

//Read all pet in the petshop
router.get('/', jwtMiddleware.verifyToken, petShopController.readAllPet);

//To add a new pet
router.post('/', jwtMiddleware.verifyToken, upload.single('pet_image'), petShopController.addPet);

//To delete a pet
router.delete('/:pet_id', jwtMiddleware.verifyToken, petShopController.deletePet);

//To get pet by pet_id
router.get('/:pet_id',  petShopController.getPetById);

//To update a pet
router.put('/:pet_id', jwtMiddleware.verifyToken, upload.single('pet_image'), petShopController.updatePet);

//Export routes
module.exports = router