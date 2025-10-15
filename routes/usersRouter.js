const express = require("express");

const service = require('../services/usersService');

const router = express.Router();

router.get("/", (req, res) =>{
  const users = service.getAll();
  res.json(users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = service.getById(id);
  res.json(user);
});

router.post('/', (req, res) => {
  const { name, username, password } = req.body;
  const newUser = service.create(name, username, password);
  res.status(201).json({
    message: 'created',
    data: newUser
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name, username, password } = req.body;
  const user = service.update(id, name, username, password);
  res.json({
    message: 'update',
    data: user
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userDelete = service.delete(id);
  res.json({
    message: userDelete
  });
});


module.exports = router;
