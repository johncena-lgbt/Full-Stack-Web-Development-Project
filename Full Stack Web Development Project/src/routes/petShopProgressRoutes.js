//Required modules
const express = require('express');
const petShopProgressController = require('../controllers/petShopProgressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

//Create router
const router = express.Router();

//Define routes

//Add a new petShopProgress
router.post('/', jwtMiddleware.verifyToken, petShopProgressController.checkUserPoints, petShopProgressController.addPetShopProgress);

//Export routers
module.exports = router