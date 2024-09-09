# ECOLINK Application that allows users to complete tasks and buy pets

This repository contains a web application using Node.js, Express, MySQL, JSON Web Token, Bcrypt, Multer, Dotenv and Nodemon.

## Folder Structure

```
BED-CA2-P2322948-DIT03
├─ public   
│  ├─ css                        
│  │  ├─ color.css               
│  │  └─ style.css               
│  ├─ images     
│  ├─ js                         
│  │  ├─ allPosts.js        
│  │  ├─ allTasks.js        
│  │  ├─ buyPet.js        
│  │  ├─ createPet.js        
│  │  ├─ createPost.js        
│  │  ├─ createTask.js        
│  │  ├─ deleteTask.js        
│  │  ├─ getCurrentUrl.js        
│  │  ├─ login.js        
│  │  ├─ managePost.js        
│  │  ├─ petShop.js        
│  │  ├─ profile.js        
│  │  ├─ queryCMDS.js        
│  │  ├─ register.js        
│  │  ├─ taskProgress.js        
│  │  ├─ updatePet.js        
│  │  ├─ updateTask.js        
│  │  └─ userNavbarToggle.js     
│  ├─ buyPet.html                 
│  ├─ createPet.html                 
│  ├─ createPost.html                 
│  ├─ home.html                 
│  ├─ login.html                 
│  ├─ managePost.html                 
│  ├─ petShop.html                 
│  ├─ posts.html                 
│  ├─ profile.html                 
│  ├─ register.html                 
│  ├─ task.html                 
│  ├─ taskProgress.html                 
│  ├─ updatePet.html                 
│  └─ updateTask.html      
├─ src                           
│  ├─ configs                    
│  │  └─ initTables.js           
│  ├─ controllers                
│  │  ├─ messageController.js     
│  │  ├─ petShopController.js     
│  │  ├─ petShopProgressController.js     
│  │  ├─ taskController.js     
│  │  ├─ taskProgressController.js     
│  │  └─ userController.js       
│  ├─ middlewares                
│  │  ├─ bcryptMiddleware.js     
│  │  └─ jwtMiddleware.js        
│  ├─ models                     
│  │  ├─ messageModel.js          
│  │  ├─ petShopModel.js         
│  │  ├─ petShopProgressModel.js         
│  │  ├─ taskModel.js         
│  │  ├─ taskProgressModel.js         
│  │  └─ userModel.js  
│  ├─ routes                     
│  │  ├─ mainRoutes.js           
│  │  ├─ messageRoutes.js         
│  │  ├─ petshopProgressRoutes.js        
│  │  ├─ petShopRoutes.js        
│  │  ├─ taskProgressRoutes.js        
│  │  ├─ taskRoutes.js        
│  │  └─ userRoutes.js           
│  ├─ services                   
│  │  └─ db.js                   
│  └─ app.js   
├─ index.js                      
├─ package.json                  
└─ readme.md                     
```

## Prerequisites

Before starting the sever, ensure the following dependencies are installed:
- Node.js
- npm (Node Package Manager)
- BCRYPT
- jsonwebtoken
- multer
- mysql2
- nodemon
- express
- path
- dotenv

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

### Setup

To set up environment variables for your Express.js application, follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   Replace `<your_secret_key>`, `<duration>`, and `<selected_algorithm>` with the appropriate values for your JSON web token usage.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_DATABASE=pokemon
   JWT_SECRET_KEY=your-secret-key
   JWT_EXPIRES_IN=15m
   JWT_ALGORITHM=HS256
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the `.env` file.

### Usage

The `db.js` file in the `src/services` directory uses the `dotenv` package to read the `.env` file and set the environment variables. Here's an example of how the `db.js` file should look:

```javascript
require('dotenv').config(); // Read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10, // Set limit to 10 connections
    host: process.env.DB_HOST, // Get host from environment variable
    user: process.env.DB_USER, // Get user from environment variable
    password: process.env.DB_PASSWORD, // Get password from environment variable
    database: process.env.DB_DATABASE, // Get database from environment variable
    multipleStatements: true, // Allow multiple SQL statements
    dateStrings: true // Return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;
```

The `dotenv` package is used to load the environment variables from the `.env` file, and `process.env` is used to access these variables in your code.

Make sure to include the `require('dotenv').config();` line at the beginning of your file to load the environment variables from the `.env` file.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Error Handling
The application implements robust error handling to ensure stability and provide clear feedback. This includes handling common scenarios like invalid user input, failed database operations, and server errors. Each API endpoint is designed to return meaningful error messages and appropriate HTTP status codes, enhancing the debugging process and user experience.

## Testing
API endpoints were thoroughly tested using Postman, ensuring correct responses and error handling. Additionally, MySQL was used to verify database operations and schema integrity.

## Contributors
Su Wei Jie

## License
This project is developed as part of an academic assignment. It is not open for public use, modification, or distribution. All rights are reserved by the author Su Wei Jie. This project is for educational purposes only.