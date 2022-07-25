const { Router } = require("express");
let users = require("../users");

const routes = Router();

routes.get('/', (req, res) => {
    return res.status(200).json(users);
});

routes.post('/', (req, res) => {
    const body = req.body;

    let lastId =  users.length > 0 ? users[users.length -1].id + 1 : 1;

    let newUser= body.map((item) => ({
        id: lastId++,
        ...item
    }));

    users = [...users, ...newUser];

    return res.status(200).json(users);
});

routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { username, email, password } = req.body;

    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex < 0) return res.status(404).json({ error: 'User not found.'});

    const user = { id, username, email, password };
    users[userIndex] = user;

    return res.status(200).json(users);
})

routes.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { password } = req.body;

    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex < 0) return res.status(404).json({ error: 'User not found.'});

    users[userIndex].password = password;

    return res.status(200).json(users[userIndex]);
})

routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((item) => item.id === id);

    if (userIndex < 0) return res.status(404).json({ error: 'User not found.'});

    users.splice(userIndex, 1);

    return res.status(200).send();
})

module.exports = routes;