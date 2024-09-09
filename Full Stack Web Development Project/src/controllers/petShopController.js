const petShopModel = require('../models/petShopModel');
const path = require('path');

//To read all pet in the petShop
module.exports.readAllPet = (req,res,next) => {
    const callback = (error, results) => {
        if(error){
            console.log(error);
            res.status(500).json({
                status:500,
                message:'Internal server error'
            })
        }else {
            res.status(200).json(results)
        }
    }

    petShopModel.readAllPet(callback);
}

//To add a new pet
module.exports.addPet = (req,res,next) => {
    let savedImagePath = '';
    if (req.file) {
        // Use only the file name and prepend the 'images/' directory
        savedImagePath = 'images/' + path.basename(req.file.path);
    }

    const data = {
        pet_name: req.body.pet_name,
        pet_description: req.body.pet_description,
        pet_price: req.body.pet_price,
        pet_image: savedImagePath // Save only the relative path in the database
    }
    
    if(!data.pet_name || !data.pet_description || !data.pet_price || !data.pet_image){
        return res.status(400).json({
            status:400,
            message:'Bad request'
        })
    }

    const callback = (error,results,fields) => {
        if(error){
            console.log(error);
            res.status(500).json({
                status:500,
                message:"Internal server error"
            })
        }else {
            res.status(201).json({
                status:201,
                message:"Pet added successfully"
            })
        }
    }

    petShopModel.addPet(data,callback);
}

//To delete a pet
module.exports.deletePet =(req,res,next) => {
    const data = {
        pet_id: req.params.pet_id
    }

    if(!data.pet_id){
        return res.status(400).json({
            status:400,
            message:'Bad request'
        })
    }

    const callback = (error,results,fields) => {
        if(error){
            console.log(error);
            res.status(500).json({
                status:500,
                message:"Internal server error"
            })
        }else{
            res.status(200).json({
                status:200,
                message:"Pet deleted successfully"
            })
        }
    }

    petShopModel.deletePet(data,callback);
}

//To get pet by pet_id
module.exports.getPetById = (req,res,next) => {
    const data= {
        pet_id: req.params.pet_id
    }

    if(!data.pet_id){
        return res.status(400).json({
            status:400,
            message:'Bad request'
        })
    }

    const callback = (error, results, fields) => {
        if(error){
            console.log(error);a
            res.status(500).json({
                status:500,
                message:"Internal server error"
            })
        }else {
            res.status(200).json(results)
        }
    }

    petShopModel.getPetById(data,callback);
}

//To update a pet
module.exports.updatePet = (req,res, next) => {
    let savedImagePath = '';

    if (req.file) {
        // Use only the file name and prepend the 'images/' directory
        savedImagePath = 'images/' + path.basename(req.file.path);
    }

    const data = {
        pet_id: req.params.pet_id,
        pet_name: req.body.pet_name,
        pet_description: req.body.pet_description,
        pet_price: req.body.pet_price,
        pet_image: savedImagePath, // Save only the relative path in the database
    }

    if(!data.pet_name || !data.pet_description || !data.pet_price || !data.pet_image){
        return res.status(400).json({
            status:400,
            message:'Bad request'
        })
    }

    const callback =(error,results,fields) => {
        if(error){
            console.log(error);
            res.status(500).json({
                status:500,
                message:"Internal server error"
            })
        }else {
            if(results.affectedRows === 0){
                res.status(404).json({
                    status:404,
                    message:"Pet not found"
                })
            }else{
                res.status(200).json({
                    status:200,
                    message:"Pet updated successfully"
                })
            }
        }
    }

    petShopModel.updatePet(data,callback);
}