const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    validateUserInfo: (req, res, next) => {
        if(req.body.username && req.body.username.length > 0 && req.body.password && req.body.password.length > 0)
            next();
        else
            res.status(400).json({message: "missing or invalid user information"});
    },
    restrictToUsers: (req, res, next) => {
        if(req.headers.authorization) {
            jwt.verify(req.headers.authorization, process.env.SECRET, (err, token) => {
                if(err)
                    res.status(401).json({message: "invalid token"})
                else
                    next();
            });
        }
        else
            res.status(400).json({message: "no JSON token found in headers"});
    },
    hashPassword: (req, res, next) => {
        req.body.password = bcrypt.hashSync(req.body.password, 14);
        next();
    }
}
