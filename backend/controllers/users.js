const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
  .then((user) => {
    if(!user){
      const error = new Error('Server Error');
      error.statusCode = 500;
      throw error;
    }

    res.send({ data: user })
  })
  .catch(next);
};

module.exports.getUser = (req, res, next) => {

  if (!req.user || !req.user.id) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  User.findById(req.user.id)
  .orFail(()=>{
    const error = new Error('There is no such user');
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send({ data: user }))
  .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Invalid Data');
    error.statusCode = 400;
    throw error;
  }

  bcrypt.hash(password, 10)
  .then(hash => User.create({
    email,
    password: hash,
  }))
  .then(user => res.status(201).send({ data: user }))
  .catch(next);
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('E-mail ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      const error = new Error('E-mail ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user._id }, "uY8n3+PqWz5jZxQfVbG2sL1mT4oN7dJcR9KX6A0MZFY=", { expiresIn: '7d' });

    return res.status(200).json({ token });

  } catch (err) {
    next(err);
  }
}