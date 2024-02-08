// user.router.js
const { createUser, getUserByUserId, getUsers, updateUser, deleteUser, login } = require('./user.controller');
const { checkToken } = require('../../auth/token_validation');
const router = require('express').Router();

// New route /check
router.get('/check', (req, res) => {
    res.send('Hello from /api/users/check route!');
});

// Existing routes
router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserByUserId);
router.patch('/', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);
router.post('/login', login);

module.exports = router;
