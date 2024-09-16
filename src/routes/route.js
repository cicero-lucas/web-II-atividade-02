const express = require("express");
const { home} = require("../controllers/controller");
const { cadastroPlaca } = require("../controllers/cadastroPlaca");
const upload = require("../middleware/uploadMiddleware");
const { gerarRelatorio } = require("../controllers/relatorioCidade");
const { consultaPlaca } = require('../controllers/consultaPlaca');
const userController = require("../controllers/userContoller");
const { videoTutorial } = require("../controllers/videoTutorial");

const rotas = express.Router();



rotas.get('/',home);
rotas.get('/relatorio/cidade/:cidade', gerarRelatorio);
rotas.post('/cadastroPlaca', upload.single('placa'), cadastroPlaca);
rotas.post('/cadastro', userController.cadastraUsuario);
rotas.post('/login', userController.paginaLogin);
rotas.get('/consulta/:placa', consultaPlaca);
rotas.post('/videoTutorial', videoTutorial);

module.exports=rotas;