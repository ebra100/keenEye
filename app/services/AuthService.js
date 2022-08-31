const jwt = require("jsonwebtoken")
const jwtRefresh = require("jsonwebtoken-refresh")
const bcrypt = require('bcrypt');

module.exports.generateToken = async (user) => {

    let token = await jwt.sign({ _id: user._id }, "123456", { expiresIn: 60 });
    return token
};

module.exports.generateRefreshToken = async (user) => {

    let refreshToken = await jwt.sign({ _id: user._id }, "123456");
    return refreshToken
};


module.exports.verifyToken = async (token, refreshToken) => {

    try {

        let decodedToken = await jwt.verify(token, "123456");

        return decodedToken;

    } catch (error) {

        if (error.name == "TokenExpiredError") {

            let decodedRefreshToken = await jwt.verify(refreshToken, "123456");
         
            let newToken = await this.generateToken(decodedRefreshToken)

            let user = await jwt.verify(newToken, "123456");

            return user
        }

        throw error
    }

};

module.exports.comparePassword = async (plainPassword, hashPassword) => {

    let isMatch = await bcrypt.compare(plainPassword, hashPassword);

    return isMatch;
}
