// Aula Assíncrona.

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.redirect('/produtos');
})

app.get('/produtos', (req, res) => {
    res.send('Hello World!');
})

app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000')
});