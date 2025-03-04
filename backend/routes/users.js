const router = require('express').Router();
const { getUser, getUsers, createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.get('/', getUsers);
router.get('/me', getUser);
router.post('/', createUser);

module.exports = router;