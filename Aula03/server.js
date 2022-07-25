// Exercício 3

const express = require('express');
const app = express();

app.use(express.json());

// Routes
const products = require('./routes/routeProducts');
app.use('/api/products', products);

app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000')
});