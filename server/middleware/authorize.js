const db = require('../db')
const jwt = require('jsonwebtoken')

const authorize = (role) => {
    return async(req, res, next) => {
        try {
            const token = req.cookies.token

            if(!token){
                return res.status(401).json({
                    message : "Please Login"
                })
            }

            const decoded = await jwt.verify(token , "sajiloEncrypt")

            const sql = `SELECT userName , phoneNo , role FROM user WHERE phoneNo  = ?`

            db.query(sql , [decoded.phoneNo] , (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Server Error"
                    })
                }

                if (result.length === 0) {
                    return res.status(401).json({
                        message: "User Not Found"
                    })
                }

                if(result[0].role !== role ){
                    return res.json({
                        message : "Access Denied"
                    })
                }
                req.user = result[0]

                next()
            })
        } catch (error) {
            console.log(error)

            return res.status(401).json({
                message: "Invalid or Expired Token"
            })
        }
    }
}

module.exports = authorize