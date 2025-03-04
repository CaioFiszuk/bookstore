const router = require('express').Router();
const { getUser, getUsers, createUser, login } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.post('/', createUser);
router.post('/signin', login);

module.exports = router;