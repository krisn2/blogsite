const jwt = require("jsonwebtoken");

const secret = "mysecret";

function createTokenForUser(user) {
    const payload ={
        _id: user._id,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl
    }

    const token = jwt.sign(payload, secret);
    return token

}

function validateToken(token) {
    return jwt.verify(token, secret);
}

module.exports = {
    createTokenForUser,
    validateToken
}