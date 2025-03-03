const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
  .then((user) => {
    if(!user){
      const error = new Error('Esse no servidor');
      error.statusCode = 500;
      throw error;
    }

    res.send({ data: user })
  })
  .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
  .orFail(()=>{
    const error = new Error('Esse usuário não existe');
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send({ data: user }))
  .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, ...data } = req.body;

  if (!email || !password) {
    const error = new Error('Dados Inválidos');
    error.statusCode = 400;
    throw error;
  }

  bcrypt.hash(password, 10)
  .then(hash => User.create({
    email,
    password: hash,
    ...data
  }))
  .then(user => res.status(201).send({ data: user }))
  .catch(next);
};
