const userModel = require("./user_model");
const {validateUserInfo, hashPassword, restrictToUsers} = require("./middleware");
const router = require("express").Router();
const bcrypt = require('bcrypt');
const {genUserToken} = require("../auth_helpers");

router.post("/register", [validateUserInfo, hashPassword], (req, res) => {
    userModel.addUser(req.body)
    .then(() => res.sendStatus(201))
    .catch((e) => res.status(500).json({message: "could not create user"}));
});

router.post("/login", (req, res) => {
    userModel.getUserByUsername(req.body.username)
    .then(user => {
        if(user && bcrypt.compareSync(req.body.password, user.password)) {
            res.status(200).json({
                message: `Welcome ${user.username}`,
                token: genUserToken(user)
            });
        }
        else
            res.status(401).json({message: "invalid login credentials"})
    })
    .catch(e => res.status(500).json({message: "error authenticating password"}));
});

router.get("/users", restrictToUsers, (req, res) => {
    userModel.getAllUsers()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({message: "could not get users"}));
});

module.exports = router;