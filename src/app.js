const express = require("express");
const cors = require("cors");
const path = require("path");
const rotas = require("./routes/route");
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
require("dotenv").config();
// Middleware para permitir o parsing de JSON e dados de formulários
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const secret=process.env.SECRET2

app.use(session({
    secret:secret,
    resave: false,
    saveUninitialized: true,
  }));

  app.use(flash());

app.use(cookieParser());

// Configuração do CORS
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

// Configuração do Handlebars
app.engine('hbs', exphbs.engine({ 
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Define o diretório de layouts
    defaultLayout: 'main' // Define o layout padrão como 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); // Define o diretório para views

// Middleware para arquivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', rotas);

module.exports = app;