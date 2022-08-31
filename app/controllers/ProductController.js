const ProductService = require("../services/ProductService");

module.exports.listProducts = async (req, res) => {

    try {

        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        let skip = limit * (page - 1)

        let products = await ProductService.listProducts(limit, skip)
        return res.send({ result: products });

    } catch (error) {

        let status = error.status || 500
        return res.status(status).send({
            message: error.message
        })
    }
}

module.exports.addProducts = async (req, res) => {

    try {

        let image = `${req.file.destination}${req.file.filename}`
        let product = await ProductService.addProduct({ image: image, ...req.body })
        return res.send({ result: product });

    } catch (error) {

        let status = error.status || 500
        return res.status(status).send({
            message: error.message
        })
    }
}