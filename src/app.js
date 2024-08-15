require("dotenv").config(); // Carregar variáveis de ambiente
const express = require("express");
const cors = require("cors");
const rotas = require("./routes/route");
const { conexaoDb } = require("./database/conectDb");

const app = express();

// Middleware para permitir o parsing de JSON e dados de formulários
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

// Conectar ao banco de dados
conexaoDb();

// Definir rotas da aplicação
app.use(rotas);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server rodando na porta: ${PORT}`);
});
