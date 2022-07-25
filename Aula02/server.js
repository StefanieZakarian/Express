// Exercício 2

const express = require('express');
let products = require('./products');
const app = express();

app.use(express.json());

app.post('/produtos', (req, res) => {
    const body = req.body;

    let lastId = products[products.length -1].id + 1;

    let newProducts = body.map((item) => ({
        id: lastId++,
        ...item
    }));

    products = [...products, ...newProducts];

    res.status(200).json(products);
})

app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, price, quantity, colors } = req.body;

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex < 0) return res.status(404).json({ error: 'Product not found.'});

    const product = { id, name, price, quantity, colors };
    products[productIndex] = product;

    res.status(200).json(products);
})

app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex < 0) return res.status(404).json({ error: 'Product not found.'});

    products.splice(productIndex, 1);

    res.status(200).send();
})

app.get('/produtos', (req, res) => {
    res.status(200).json(products);
})

app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000')
});