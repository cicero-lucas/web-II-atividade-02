const app = require('./app');
const { conexaoDb } = require("./database/conectDb");

conexaoDb();

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server rodando na porta: ${PORT}`);
});

module.exports = server;