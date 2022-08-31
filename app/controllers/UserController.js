const userService = require("../services/UserService");

module.exports.register = async (req, res) => {

    try {

        let user = await userService.register(req.body);

        return res.send({ result: user });

    } catch (error) {

        let status = error.status || 500
        return res.status(status).send({
            message: error.message
        })
    }
}

module.exports.login = async (req, res) => {

    try {

        let user = await userService.login(req.body.username, req.body.password);

        return res.send({ result: user });

    } catch (error) {

        let status = error.status || 500
        return res.status(status).send({
            message: error.message
        })
    }
}
