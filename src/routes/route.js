const express = require("express");
const { home } = require("../controllers/controller");
const { cadastroPlaca } = require("../controllers/cadastroPlaca");
const upload = require("../middleware/uploadMiddleware");
const { gerarRelatorio } = require("../controllers/relatorioCidade");
const { consultaPlaca } = require('../controllers/consultaPlaca');
const userController = require("../controllers/userContoller");
const { verIdUser } = require('../Helpers/Helpers');
const { videoTutorial } = require("../controllers/videoTutorial");

const rotas = express.Router();

rotas.get('/', home);
rotas.get('/relatorio/cidade/:cidade', verIdUser, gerarRelatorio); // Rota protegida
rotas.post('/cadastroPlaca', verIdUser, upload.single('placa'), cadastroPlaca); // Rota protegida
rotas.get('/consulta/:placa', verIdUser, consultaPlaca); // Rota protegida
rotas.post('/cadastro', userController.cadastraUsuario);
rotas.post('/login', userController.paginaLogin);

rotas.post('/videoTutorial', videoTutorial);

module.exports = rotas;