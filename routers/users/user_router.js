const userModel = require("./user_model");
const {validateUserInfo, hashPassword, restrictToLogin} = require("./middleware");
const router = require("express").Router();
const bcrypt = require('bcrypt');

router.post("/register", [validateUserInfo, hashPassword], (req, res) => {
    userModel.addUser(req.body)
    .then(() => res.sendStatus(201))
    .catch(() => res.status(500).json({message: "could not create user"}));
});

router.post("/login", (req, res) => {
    userModel.getPasswordByUsername(req.body.username)
    .then(passObj => {
        if(passObj && bcrypt.compareSync(req.body.password, passObj.password)) {
            req.session.username = req.body.username;
            res.sendStatus(200);
        }
        else
            res.status(401).json({message: "invalid login credentials"})
    })
    .catch(e => res.status(500).json({message: "error authenticating password"}));
});

router.get("/users", restrictToLogin, (req, res) => {
    userModel.getAllUsers()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({message: "could not get users"}));
});

module.exports = router;