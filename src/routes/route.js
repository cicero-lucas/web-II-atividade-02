const express = require("express");
const { teste } = require("../controllers/controller");

const rotas= express.Router();

rotas.get('/',teste);

module.exports=rotas;