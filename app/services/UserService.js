const { User } = require("../models/User");
const authService = require("../services/AuthService")

module.exports.register = async (user) => {

    let createdUser = await User.create(user);
    let token = await authService.generateToken(createdUser);
    let refreshToken = await authService.generateRefreshToken(createdUser)

    return { createdUser, token, refreshToken };

}


module.exports.login = async (username, password) => {


    let user = await User.findOne({ username });

    if (!user)

        throw {
            status: 404,
            message: "wrong username or password"
        }

    let isRightPassword = await authService.comparePassword(password, user.password);

    if (!isRightPassword)

        throw {
            status: 404,
            message: "wrong username or password"

        }

    let token = await authService.generateToken(user);
    let refreshToken = await authService.generateRefreshToken(user)

    return { user, token, refreshToken };

}

module.exports.findUserById = async (id) => {


    let user = await User.findById(id).lean();
    return user;

}
