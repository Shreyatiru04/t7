const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// READ all users (API)
router.get('/', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.json(users);
  } else {
    res.render('users', { users });
  }
});

// CREATE a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.json(newUser);
});

// UPDATE a user
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find(u => u.id === id);
  if (user) {
    user.name = name;
    user.email = email;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
