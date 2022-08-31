const AuthService = require("../app/services/AuthService")
const UserService = require("../app/services/UserService")

module.exports.auth = async (req, res, next) => {

    try {

        let token = req.headers.authorization.split(" ")[1];
        let refreshToken = req.headers['x-auth-token']

        let user = await AuthService.verifyToken(token, refreshToken);

        if (user) {

            let isExists = await UserService.findUserById(user._id);

            if (!isExists) {

                return res.status(404).send({ messaeg: "user not found" })
            }

            return next()
        }

    } catch (error) {

        console.log(error)

        return res.status(500).send({ messaeg: error.messaeg })

    }

}