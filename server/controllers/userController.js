const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const createUser = (req, res) => {
    try {
        const { username, email, password } = req.body;

        const gensalt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, gensalt);

        const sql = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [username, email, hashPassword],
            (err, result) => {
                if (err) {
                    console.log("Error:", err);

                    return res.status(500).json({
                        message: "Error"
                    });
                }

                return res.status(200).json({
                    result
                });
            }
        );

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};



const getAllUser = (req , res) => {
    try {
        const sql = `
            SELECT  * FROM users
        `
        db.query(sql , (err , result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }

            if(result.length === 0){
                return res.status(404).json({
                    message : "No User Found",
                })
            }

            return res.status(200).json({
                data : result
            })
        })

    } catch (error) {
        console.log('Error : ', error );
        
    }
}

const getSingleUser = (req , res) => {
    try {
        const {id} = req.params

        const sql = `
            SELECT  * FROM users WHERE id = ?
        `
        db.query(sql , [id] ,(err , result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }

            if(result.length === 0){
                return res.status(404).json({
                    message : "No User Found",
                })
            }

            return res.status(200).json({
                result : result
            })
        })

    } catch (error) {
        console.log('Error : ', error );
        
    }
}

const deleteUser = (req , res) => {
    try {
        const {id} = req.params

        const sql = `
            DELETE FROM users WHERE id = ?
        `
        db.query(sql , [id] ,(err , result) => {
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                    message : "Error",
                })
            }


            return res.status(200).json({
                result : result
            })
        })

    } catch (error) {
        console.log('Error : ', error );
        
    }
}

const updateUser = (req , res) => {
    try {

        const {id} = req.params

        const {username , email , password} = req.body
        const { image } = req.file

        const sql = `
            UPDATE users SET username=? , email=? ,image = ?, password=? WHERE id=?
        `

        db.query(sql , [username , email , image , password , id] , (err, result) =>{
            if(err){
                console.log("Error : ", err)
                return res.status(500).json({
                message : "Error",
                })
            }

            return res.status(200).json({
                message : "User Updated Successfully",
                result : result
            })
        })
    } catch (error) {
        
    }
}

const Login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const sql = `
            SELECT * FROM users WHERE email = ?
        `;

        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log("Database Error:", err);

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Invalid Email"
                });
            }

            const user = result[0];

            const isMatch = bcrypt.compareSync(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign({id : user.id , email : user.email , role : user.role} , "jwt" , {
                expiresIn : '30d'
            })

            return res.status(200).json({
                message: "Login Successfully",
                user : user,
                token
            });
        });

    } catch (error) {
        console.log("Login Error:", error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};


module.exports = { createUser , getAllUser , getSingleUser , deleteUser , updateUser ,Login}