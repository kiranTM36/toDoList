const mysql = require('mysql2')

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "todolist"
})

db.connect((err) => {
    if(err){
        console.log("Database connection Error : " ,err);
        return
    }

    console.log("Database connection Successfully");
    

})
module.exports = db