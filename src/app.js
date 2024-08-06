require("dotenv").config();
const express = require("express");
const rotas = require("./routes/route");

const app = express();

app.use(rotas);

app.listen(process.env.PORT||3000, ()=>{
    console.log(`Server Rodando na Porta: ${process.env.PORT}`)
})
