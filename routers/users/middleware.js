const bcrypt = require("bcrypt");
const userModel = require("./user_model");

module.exports = {
    validateUserInfo: (req, res, next) => {
        if(req.body.username && req.body.username.length > 0 && req.body.password && req.body.password.length > 0)
            next();
        else
            res.status(400).json({message: "missing or invalid user information"});
    },
    restrictToLogin: (req, res, next) => {
        if(req.session && req.session.username)
            next();
        else
            res.sendStatus(401);
    },
    hashPassword: (req, res, next) => {
        req.body.password = bcrypt.hashSync(req.body.password, 14);
        next();
    }
}
