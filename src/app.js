require("dotenv").config();
const express = require("express");
const rotas = require("./routes/route");
const { conexaoDb } = require("./database/conectDb");
const cors = require("cors");

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(rotas);
app.use(express.json());
app.use(rotas);

conexaoDb();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.listen(process.env.PORT||3000, ()=>{
    console.log(`Server Rodando na Porta: ${process.env.PORT}`)
})
