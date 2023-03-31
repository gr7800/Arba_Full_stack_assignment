// This is a controller function to fetch all products from the database and send them as a response.
const User = require('../UserAuth/User.model');
const ProductModel = require('./Product.model')
const jwt = require('jsonwebtoken');

// Controller function to get all products
exports.addProduct = async (req, res) => {
    let { title, description, price, category, image } = req.body;
    let { token } = req.headers;
    let decode = jwt.decode(token, process.env.JWT_SECRET);
    try {
        // Find all products from the database using ProductModel
        let user = await User.findOne({ email: decode.email });
        let createProd = await ProductModel.create({
            title,
            description,
            price,
            image,
            category,
            owner: user._id,
        });
        return res.status(200).send({ status: true, messege: "product added successfully" });

        // Send the products as a response

    } catch (error) {
        // Handle error if products cannot be fetched from the database
        console.log(error);
        return res.status(404).send({ status: false, messege: "something went wrong" });
    }
}

exports.updateProduct = async (req, res) => {
    let data = req.body;
    let { id } = req.params;
    console.log(id)
    try {
        // Find all products from the database using ProductModel
        let updateProduct = await ProductModel.findByIdAndUpdate({ _id: id }, { ...data });
        return res.status(200).send({ status: true, messege: "product updated successfully" });

    } catch (error) {
        // Handle error if products cannot be fetched from the database
        console.log(error);
        return res.status(404).send({ status: false, messege: "something went wrong" });
    }
}


exports.getProduct = async (req, res) => {
    try {
        let products = await ProductModel.find();
        return res.status(200).send({ status: true, messege: "Product fetched sucesfully", result: products });
    } catch (error) {
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}

exports.getSingleProduct = async (req, res) => {
    let { id } = req.params;
    try {
        let product = await ProductModel.findById({ _id: id });
        return res.status(200).send({ status: true, messege: "Product fetched sucesfully", result: product });
    } catch (error) {
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}


exports.deleteProductByid = async (req, res) => {
    let { id } = req.params;
    console.log(id)
    try {
        let prods = await ProductModel.findByIdAndDelete({ _id: id });
        return res.status(200).send({ status: true, messege: "product deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ status: false, messege: "something went wrong" });
    }
}