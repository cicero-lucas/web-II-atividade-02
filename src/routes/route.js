const express = require("express");
const { teste } = require("../controllers/controller");
const { cadastroPlaca } = require("../controllers/cadastroPlaca");
const upload = require("../middleware/uploadMiddleware");
const { gerarRelatorio } = require("../controllers/relatorioCidade");
const rotas = express.Router();

rotas.get('/',teste);
rotas.get('/relatorio/cidade/:cidade',gerarRelatorio);
rotas.post('/cadastroPlaca', upload.single('placa'), cadastroPlaca);

module.exports=rotas;