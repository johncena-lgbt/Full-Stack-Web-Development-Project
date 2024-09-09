//Required modules
const petShopProgressModel = require('../models/petShopProgressModel');

//Check if the user has enough point
module.exports.checkUserPoints = (req,res,next) => {
    const data = {
        pet_id: req.body.pet_id,
        user_id: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if(error){
            console.log(error);
            return res.status(500).json({
                status:500,
                message: "Internal Server Error"
            })
        }else {
            if(results[0].total_points >= results[0].pet_price){
                next();
            }else {
                return res.status(400).json({
                    status:400,
                    message: "Not enough points to purchase this pet"
                })
            }
        }
    }

    petShopProgressModel.checkUserPoints(data, callback);
}

//Add a new petShopProgress
module.exports.addPetShopProgress = (req,res,next) => {
    const data = {
        pet_id: req.body.pet_id,
        user_id: res.locals.userId,
        purchase_date: req.body.purchase_date
    }

    const callback = (error, results, fields) => {
        if(error){
            console.log(error);
            return res.status(500).json({
                status:500,
                message: "Internal Server Error"
            })
        }else {
            return res.status(201).json({
                status:201,
                message: "Pet Shop Progress added successfully"
            })
        }
    }

    petShopProgressModel.addPetShopProgress(data, callback);
}