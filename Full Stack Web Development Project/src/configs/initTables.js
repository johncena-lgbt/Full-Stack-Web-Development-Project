const pool = require("../services/db");
const bcrypt = require('bcrypt');

const SQLSTATEMENT = `
  DROP TABLE IF EXISTS User;
  DROP TABLE IF EXISTS Task;
  DROP TABLE IF EXISTS TaskProgress;
  DROP TABLE IF EXISTS Messages;
  DROP TABLE IF EXISTS PetShop;
  DROP TABLE IF EXISTS PetShopProgress;

  CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT,
    profile_image VARCHAR(255)
  );
  CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
  );
  CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date DATE,
    notes TEXT
  );
  CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    title TEXT,
    messageText TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE PetShop (
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    pet_name TEXT,
    pet_image VARCHAR(255),
    pet_description TEXT,
    pet_price INT
  );
  CREATE TABLE PetShopProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    purchase_date DATE
  );
  
  INSERT INTO Task (task_id, title, description, points) VALUES 
  (1, "Plant a Tree", "Plant a tree in your neighbourhood or a designated green area.", 50),
  (2, "Use Public Transportation", "Use public transportation or carpool instead of driving alone.", 30),
  (3, "Reduce Plastic Usage", "Commit to using reusable bags and containers.", 40),
  (4, "Energy Conservation", "Turn off lights and appliances when not in use.", 25),
  (5, "Composting", "Composting kitchen scraps to create natural fertilizer.", 35);

  INSERT INTO PetShop (pet_id, pet_name, pet_image, pet_description, pet_price) VALUES
  (1, "Button", "images/ButtonTheDog.png", "Button is an adorable and playful pet with a cheerful personality, known for its fluffy caramel and cream fur and big, sparkling eyes. Always ready for cuddles, Button brings joy to everyone with its cute antics and tiny bow tie.", 40),
  (2, "Misty", "images/MistyTheCat.png", "Misty is a charming gray-and-white kitten with expressive eyes, known for her curious and affectionate nature. She loves sunlit spots and her sparkling bell collar, bringing joy with her gentle, loving presence.", 40),
  (3, "Zazu", "images/ZazuTheParrot.png", "Zazu is a lively parrot with bright green feathers and a playful personality, always ready to mimic sounds and bring smiles with his intelligence and charm.", 60),
  (4, "Ellie", "images/EllieTheElephant.png", " Ellie is a plush gray elephant with twinkling eyes and a soft, furry charm. She's small enough to cuddle and radiates warmth and joy.", 70),
  (5, "Snapster", "images/SnapsterTheCrocodile.png", "Snapster, with his bright green scales and gentle eyes, brings a dash of adventure to every playtime, while always keeping it safe and friendly.", 80),
  (6, "Gigi", "images/GigiTheGirrafe.png", "Gigi is a sunny, plush giraffe with joyful eyes and a charming bow. Perfect for snuggles, she turns any room brighter with her presence.", 100),
  (7, "Red", "images/RaptorRedTheDinosaur.png", "Red blends into the ferns with her earthy feathers, her keen eyes scanning the misty prehistoric morning sun.", 120),
  (8, "Solara", "images/SolaraThePheonix.png", "Solara, the phoenix, soars as a blaze of glory, her fiery wings heralding the break of dawn and the promise of renewal.", 150),
  (9, "Yumiko", "images/YumikoTheKitsune.png", " Yumiko, the kitsune, glows with mystical light, her many tails a testament to her ancient wisdom and ethereal grace.", 200);



`;

// Create tables first
pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
    process.exit(1); // Exit with an error code
  } else {
    console.log("Tables created successfully:", results);

    // Insert the admin user with a hashed password
    const adminUsername = "admin";
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin"; // The plain text password
    const adminProfileImage = "images/developer.png";

    // Hash the password manually
    bcrypt.hash(adminPassword, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        process.exit(1); // Exit with an error code
      } else {
        const insertAdminUserSQL = `INSERT INTO User (username, email, password, profile_image) VALUES (?, ?, ?, ?);`;
        const adminUserValues = [adminUsername, adminEmail, hashedPassword, adminProfileImage];

        pool.query(insertAdminUserSQL, adminUserValues, (err, results) => {
          if (err) {
            console.error("Error inserting admin user:", err);
            process.exit(1); // Exit with an error code
          } else {
            console.log("Admin user inserted successfully:", results);
            process.exit(); // Exit the process after completing both operations
          }
        });
      }
    });
  }
});

