const { Product } = require("../models/Product");

module.exports.listProducts = async (limit, skip) => {

    let products = await Product.find({}).limit(limit).skip(skip);

    return products;

}

module.exports.addProduct = async (product) => {

    let createdProduct = await Product.create(product);

    return createdProduct;


}

