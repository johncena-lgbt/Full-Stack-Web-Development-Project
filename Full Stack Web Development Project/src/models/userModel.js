const pool = require("../services/db")

////////////////////////////////////////////////////////
//To check if username or email already exist(register feature) t1
////////////////////////////////////////////////////////
module.exports.chkExist = (data, callback) => {
    const SQLSTATEMENT = 
    `
    SELECT * FROM user 
    WHERE username = ? OR email = ?
    `

    const VALUES = [data.username, data.email]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

////////////////////////////////////////////////////////
//To create new user(register feature) t1
////////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password, profile_image)
    VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.username, data.email, data.password, data.profile_image];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//To help user login (login feature) t1
module.exports.selectUserByUsernameAndPassword = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id, password FROM User
        WHERE username = ?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//To get user by id (profile feature) t1
module.exports.readUserById = (data,callback) => {
    const SQLSTATEMENT = `
    SELECT User.user_id, User.username, User.email, User.profile_image,
    COALESCE(SUM(Task.points), 0) - COALESCE(pet_prices.pet_price, 0) AS total_points
    FROM User
    LEFT JOIN TaskProgress ON User.user_id = TaskProgress.user_id 
    LEFT JOIN Task ON TaskProgress.task_id = Task.task_id
    LEFT JOIN (
    SELECT PetShopProgress.user_id, SUM(PetShop.pet_price) AS pet_price
    FROM PetShopProgress
    JOIN PetShop ON PetShopProgress.pet_id = PetShop.pet_id
    WHERE PetShopProgress.user_id = ? 
    GROUP BY PetShopProgress.user_id
    ) AS pet_prices ON User.user_id = pet_prices.user_id
    WHERE User.user_id = ? 
    GROUP BY User.user_id, User.username, User.email, User.profile_image;
    `
    const VALUES = [data.user_id, data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}


//To change password for the user 
module.exports.updatePassword = (data,callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET password = ?
    WHERE user_id = ?;
    `
    const VALUES = [data.password, data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//To read user hashed password
module.exports.readUserPassword = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT password FROM User
    WHERE user_id = ?;
    `

    const VALUES = [data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback)
}

//To update user details (email, username)
module.exports.updateUserDetails = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET username = ?, email = ?
    WHERE user_id = ?;
    `
    const VALUES = [data.username, data.email, data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//To update user profile image
module.exports.updateProfileImage = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET profile_image = ?
    WHERE user_id = ?;
    `
    const VALUES = [data.profile_image, data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//To get all users pets
module.exports.selectAllUserPets = (data,callback) => {
    const SQLSTATEMENT = `
    SELECT PetShop.pet_id, PetShop.pet_name, PetShop.pet_description, PetShop.pet_image, PetShop.pet_price
    FROM PetShop
    JOIN PetShopProgress ON PetShop.pet_id = PetShopProgress.pet_id
    WHERE PetShopProgress.user_id = ?;
    `
    const VALUES = [data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//To get all users tasks
module.exports.selectAllUserTasks = (data,callback) => {
    const SQLSTATEMENT = `
    SELECT Task.task_id, Task.title, Task.description, Task.points
    FROM Task
    JOIN TaskProgress ON Task.task_id = TaskProgress.task_id
    WHERE TaskProgress.user_id = ?;
    `
    const VALUES = [data.user_id]

    pool.query(SQLSTATEMENT, VALUES, callback);
}