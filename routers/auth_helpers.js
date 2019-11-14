const jwt = require("jsonwebtoken");

const genUserToken = user => {
    return jwt.sign(
        {
            subject: user.id,
            department: user.department,
            username: user.username
        },
        process.env.SECRET,
        {
            expiresIn: "1d"
        }
    );
}