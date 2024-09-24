require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const User = require("../models/User");

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET = process.env.SECRET || "secrettoken"; // Defina o token no .env

// Cadastro de usuário
const cadastraUsuario = async (req, res) => {
    const { nome, perfil = "", email, senha, confirmsenha } = req.body;

    if (!nome || !email || !senha || !confirmsenha) {
        return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
    }
    if (senha !== confirmsenha) {
        return res.status(422).json({ msg: 'As senhas não coincidem!' });
    }

    const userExiste = await User.findOne({ email });
    if (userExiste) {
        return res.status(422).json({ msg: 'Usuário já cadastrado' });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    const user = new User({
        nome,
        perfil: perfil || nome,
        email,
        senha: passwordHash,
    });

    try {
        await user.save();
        res.status(200).json({ msg: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao cadastrar usuário' });
    }
};

// Login de usuário e geração do token
const paginaLogin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(422).json({ msg: 'Email e senha são obrigatórios!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não cadastrado!' });
    }

    const isPasswordCorrect = await bcrypt.compare(senha, user.senha);
    if (!isPasswordCorrect) {
        return res.status(422).json({ msg: 'Senha inválida!' });
    }

    try {
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        res.cookie('tokenAuthorization', token, { httpOnly: true });
        res.status(200).json({ msg: 'Login realizado com sucesso!', token });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao realizar login' });
    }
};

// Middleware para verificar token
const verIdUser = (req, res, next) => {
    const token = req.cookies.tokenAuthorization || req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = {
    cadastraUsuario,
    paginaLogin,
    verIdUser,
};
