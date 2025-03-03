const router = require('express').Router();
const { getUser, getUsers, createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.get('/', getUsers);
router.get('/me', getUser);

module.exports = router;