require("dotenv").config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const senha = process.env.SECRET;

// Middleware para verificar o ID do usuário no cookie ou no cabeçalho
const verIdUser = (req, res, next) => {
    // Obtém o token de autorização do cookie ou do cabeçalho

    const token = req.cookies.tokenAutorization || req.header('x-auth-token');

    if (!token) {
        // Se não houver token, retorna um erro de não autorizado
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        // Verifica o token usando a senha secreta
        const decoded = jwt.verify(token, senha);

        // Associa o ID do usuário à requisição
        req.userId = decoded.id;
        next(); // Continua para a próxima função (rota)
        
    } catch (error) {
        // Se houver erro na verificação, retorna um erro de token inválido
        console.error('Erro ao verificar o token:', error.message);
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = {
    verIdUser
};