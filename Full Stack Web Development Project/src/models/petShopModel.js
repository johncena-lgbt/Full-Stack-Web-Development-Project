const pool = require('../services/db');

//To read all pets in the petShop
module.exports.readAllPet = (callback) => {
    const SQLSTATEMENT = 
    `
    SELECT * FROM petshop
    `

    pool.query(SQLSTATEMENT, callback)
}

//To add a new pet
module.exports.addPet = (data, callback) => {
    const SQLSTATEMENT =
    `
    Insert into petshop (pet_name, pet_description, pet_price, pet_image)
    VALUES (?,?,?,?)
    `

    const VALUES = [data.pet_name, data.pet_description, data.pet_price, data.pet_image]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

//To delete a pet
module.exports.deletePet = (data,callback)=> {
    const SQLSTATEMENT = `
    DELETE petshop 
    FROM petshop 
    WHERE pet_id = ?
    `

    const VALUES = [data.pet_id]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

//To get pet by pet_id
module.exports.getPetById = (data,callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM petshop WHERE pet_id = ?
    `
    const VALUES = [data.pet_id]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

//To update pet by pet_id
module.exports.updatePet = (data,callback) => {
    const SQLSTATEMENT =
    `
    UPDATE petshop 
    SET pet_name = ?, pet_description = ?, pet_price = ?, pet_image = ?
    WHERE pet_id=?
    `

    const VALUES = [data.pet_name, data.pet_description, data.pet_price, data.pet_image, data.pet_id]

    pool.query(SQLSTATEMENT, VALUES, callback)
}