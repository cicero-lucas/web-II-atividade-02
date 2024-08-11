const express = require("express");
const { teste } = require("../controllers/controller");
const { cadastroPlaca } = require("../controllers/cadastroPlaca");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

const rotas = express.Router();

rotas.get('/',teste);
rotas.post('/cadastroPlaca', upload.single('placa'), cadastroPlaca);

module.exports=rotas;