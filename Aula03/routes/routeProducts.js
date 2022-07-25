const express = require("express");
let products = require("../products");

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.status(200).json(products);
});

routes.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find((item) => item.id === id);

    if (product) return res.status(200).json(product);
    return res.status(404).json({ error: 'Product not found.'});
});

routes.post("/", (req, res) => {
    const body = req.body;

    if (!body) return res.status(400).send("Add the product correctly!");

    products = [...products, body]

    return res.status(200).json(products);
})

routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, price, quantity, colors } = req.body;

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex < 0) return res.status(404).json({ error: 'Product not found.'});

    const product = { id, name, price, quantity, colors };
    products[productIndex] = product;

    return res.status(200).json(products);
})

routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex < 0) return res.status(404).json({ error: 'Product not found.'});

    products.splice(productIndex, 1);

    return res.status(200).send();
})

module.exports = routes;