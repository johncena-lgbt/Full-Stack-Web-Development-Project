//Required modules
const express = require('express');


//Create router
const router = express.Router();

//To set up user routes
const userRoutes = require('./userRoutes');
router.use('/user', userRoutes)

//To set up task routes
const taskRoutes =  require('./taskRoutes');
router.use('/task', taskRoutes)

//To set up task progress routes
const taskProgressRoutes = require('./taskProgressRoutes');
router.use('/taskProgress', taskProgressRoutes)

//To set up message routes
const messageRoutes = require('./messageRoutes');
router.use('/message', messageRoutes)

//To set up pet shop routes
const petShopRoutes = require('./petShopRoutes');
router.use('/petShop', petShopRoutes)

const petShopProgressRoutes = require('./petShopProgressRoutes');
router.use('/petShopProgress', petShopProgressRoutes)

//Export routers
module.exports = router