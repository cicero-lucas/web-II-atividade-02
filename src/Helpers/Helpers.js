const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

senha=process.env.SECRET

// Middleware para verificar o ID do usuário no cookie
const verIdUser = (req, res, next) => {
    // Obtém o token de autorização do cookie
    const token = req.cookies.tokenAutorization;

    // Se o token estiver presente
    if (token) {
        try {
            
            const decoded = jwt.verify(token, senha);

          
            req.userId = decoded.id;

            
            next();
        } catch (error) {
            console.error('Erro ao verificar o token:', error.message);
            res.status(401).json({ message: 'Token inválido' });
        }
    } else {
        // Se não houver token presente no cookie, retorna um erro de não autorizado
        res.status(401).json({ message: 'Token não fornecido' });
    }
};

module.exports = {
    verIdUser
};


