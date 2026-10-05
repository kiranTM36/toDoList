const db = require('../db')

const createUserTable = () => {
    const sql = `
       CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(30) NOT NULL ,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin','user') DEFAULT 'user'
        )
    `
    db.query(sql , (err)=> {
        if(err){
            console.log("FAILED TO CREATE USER TABLE" , err);
            return
        }
        console.log("USER TABLE CREATED SUCCESSFULLY");
    })
}

module.exports = createUserTable