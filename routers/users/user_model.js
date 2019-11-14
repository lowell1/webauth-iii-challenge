const db = require("../../data/db.js");

module.exports = {
    addUser: userInfo => {
        return db("users").insert(userInfo);
    },   
    getUserByUsername: username => {
        return db("users").select("*").where({username: username}).first();
    },
    getAllUsers: () => {
        return db("users").select("*");
    }
}
