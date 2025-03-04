const express = require('express');
const mongoose = require("mongoose");
const app = express();
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');
const auth = require('./middlewares/auth');

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bookstore")
.then(()=>{
  console.log("Database is successfully connected");
});

const { PORT = 3000 } = process.env;

app.use(function (req, res, next) {

  if (req.originalUrl === '/users/signin' || req.originalUrl === '/users/signup') {
    return next();
  } else {
    return auth(req, res, next);
  }
});

app.use('/books', booksRoutes);
app.use('/users', usersRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));