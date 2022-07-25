const { Router } = require('express');
let products = require('../products');

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json(products);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find((item) => item.id === id);

    if (product) return res.status(200).json(product);
    return res.status(404).json({ error: 'Product not found.'});
});

router.post('/', (req, res) => {
    const body = req.body;
    const newProducts = [...products, body]
    return res.status(200).json(newProducts);
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, price, quantity, colors } = req.body;

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex < 0) return res.status(404).json({ error: 'Product not found.'});

    const product = { id, name, price, quantity, colors };
    products[productIndex] = product;

    res.status(200).json(products);
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex < 0) return res.status(404).json({ error: 'Product not found.'});

    products.splice(productIndex, 1);

    res.status(200).send();
})

module.exports = router;