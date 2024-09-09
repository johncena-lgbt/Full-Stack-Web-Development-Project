const pool = require("../services/db");

//To read all messages
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages;
    `;

    pool.query(SQLSTATMENT, callback);
}


//To read message by id
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//To check if username exists
module.exports.checkUsername = (data, callback) => {
    const SQLSTATEMENT = 
    `
    SELECT * FROM user
    WHERE username = ?
    `
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//To create a message
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (title, messageText, username)
    VALUES (?, ?, ?);
    `;
    const VALUES = [data.title, data.message_text, data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//To update a message
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET messageText = ?, title = ?, username = ?
    WHERE id = ?;
    `;
    const VALUES = [data.message_text, data.title,  data.username,data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


//To delete a message
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

