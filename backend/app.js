const express = require('express');
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(process.env.CONNECTION)
.then(()=>{
  console.log("Banco de dados conectado");
});

const { PORT = 3000 } = process.env;

app.use((err, req, res, next) => {
   console.log("erro:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));