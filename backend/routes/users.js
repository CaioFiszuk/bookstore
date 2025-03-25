const router = require('express').Router();
const { getUser, getUsers, createUser, login, getUserInfo } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/info', getUserInfo);

module.exports = router;