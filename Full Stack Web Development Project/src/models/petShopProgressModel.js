const pool = require('../services/db')

//To check if the user has enough points
module.exports.checkUserPoints = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT 
    COALESCE((
        SELECT SUM(points) FROM Task 
        INNER JOIN TaskProgress ON Task.task_id = TaskProgress.task_id 
        WHERE TaskProgress.user_id = ?
    ), 0) 
    - COALESCE((
        SELECT SUM(PetShop.pet_price) FROM PetShopProgress
        INNER JOIN PetShop ON PetShopProgress.pet_id = PetShop.pet_id
        WHERE PetShopProgress.user_id = ?  -- Replace 2 with the desired user_id
    ), 0) as total_points,
	(SELECT pet_price FROM PetShop WHERE pet_id = ?) as pet_price;
    `;

    const VALUES = [data.user_id, data.user_id, data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//To add a new petShopProgress
module.exports.addPetShopProgress = (data,callback) => {
    const SQLSTATEMENT = `
    INSERT into PetShopProgress 
    (user_id, pet_id, purchase_date) 
    VALUES (?,?,?)
    `

    const VALUES =[data.user_id, data.pet_id, data.purchase_date]

    pool.query(SQLSTATEMENT, VALUES, callback)
}