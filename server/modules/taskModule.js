const db = require('../db')

const createTaskTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS tasks (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(30) NOT NULL UNIQUE,
            description VARCHAR(255) NOT NULL,
            userId INT NOT NULL,

            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `

    db.query(sql , (err)=> {
        if(err){
            console.log("FAILED TO CREATE TASKS TABLE" , err);
            return
        }
        console.log("TASKS TABLE CCREATED SUCCESSFULLY");
    })
}

module.exports = createTaskTable