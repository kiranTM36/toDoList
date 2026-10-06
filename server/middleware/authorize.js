const jwt = require("jsonwebtoken")

const authorize = (role) => {
    return (req, res, next) => {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.status(401).json({
                    message: "Please Login"
                })
            }
            console.log(token);
            

            const decoded = jwt.verify(token, "jwt")

            if (decoded.role !== role) {
                return res.status(403).json({
                    message: "Access Denied"
                })
            }

            req.user = decoded

            next()

        } catch (error) {
            console.log("JWT Error:", error.message)

            return res.status(401).json({
                message: "Invalid or Expired Token"
            })
        }
    }
}

module.exports = authorize
