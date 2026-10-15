const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please Login"
            });
        }

        const decoded = jwt.verify(token, "jwt");

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};


const authenticate = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Please Login First"
            });
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        next();
    };
};

module.exports = {
    authorize,
    authenticate
};
