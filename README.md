# web-II-atividade-02

[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E


<h2> Titlulo:  </h2>


Atividade 02 web II

***


![javaScript]

<p align="center">
 <a href="#about">Sobre</a> • • 
 <a href="#fucionalidade">Funcionalidade</a> • • 
 <a href="#tecnologias">Tecnologias Utilizadas</a> • • 
 <a href="#usar">Deploy</a> • • 
 <a href="#aprendizado">Lições Aprendidas</a> 
</p>

<h2 id="about">📌 Sobre </h2>

<p>
Este projeto é uma API desenvolvida em Node.js e Express, com o objetivo de reconhecer e armazenar informações de placas de veículos utilizando OCR (Reconhecimento Óptico de Caracteres). A API permite o cadastro de placas a partir de imagens enviadas pelos usuários e mantém registros com informações como a cidade, data e hora do registro em um banco de dados MongoDB. Além disso, a API é capaz de gerar relatórios em PDF com os registros das placas de uma cidade específica.
</p>

<h2 id="fucionalidade"> 📌 Funcionalidades </h2>

<ul>
  <li>Cadastro de Placas: Rota POST /cadastroPlaca que permite o envio de uma foto de uma placa de veículo, juntamente com o nome da cidade. A API utiliza OCR para reconhecer a placa na imagem e armazena as informações no banco de dados MongoDB.</li>
  <li>Relatório por Cidade: Rota GET /relatorio/cidade/:cidade que gera um relatório em PDF com todas as placas registradas de uma determinada cidade, contendo informações como número da placa, cidade, data e hora do registro.</li>
  <li>Consulta de Placas: Rota GET /consulta/:placa que verifica se uma determinada placa está cadastrada no banco de dados.</li>
</ul>

<h2 id="tecnologias">🚀 Tecnologias Utilizadas </h2>

<h3>Pré-requisitos</h3>

<ul>
  <li>Node.js e Express: Plataforma e framework usados para construir a API.</li>
  <li>MongoDB: Banco de dados NoSQL utilizado para armazenar as informações das placas.</li>
  <li>OCR (Tesseract.js): Biblioteca para reconhecimento óptico de caracteres a partir das imagens das placas.</li>
  <li>PDFKit: Biblioteca utilizada para gerar os arquivos PDF dos relatórios.</li>
</ul>

<hr>
<h3>:computer: Clonagem</h3>
<p>Como clonar o projeto:</p>

<ol>
  <li>Abra o terminal.</li>
  <li>Digite o seguinte comando:</li>
</ol>

```bash
git clone https://github.com/cicero-lucas/web-II-atividade-02.git

```

<ol start="3">
  <li>Acesse o diretório do projeto:</li>
</ol>

```bash
cd nome-do-projeto
```

<ol start="4">
  <li>Instale as dependências do projeto:</li>
</ol>

```bash
npm install
```

<ol start="5">
  <li>Inicie o servidor de desenvolvimento:</li>
</ol>

```bash
npm run dev
```

<p>Após seguir esses passos, sua aplicação estará rodando localmente.</p>
<hr>

<h2 id="usar">:computer: Deploy</h2>


<p>Este projeto está hospedado no Vercel.</p>
<hr>

<h2 id="aprendizado"> :heavy_exclamation_mark: Lições Aprendidas </h2>
<p>Durante o desenvolvimento deste projeto, diversas lições importantes foram aprendidas:</p>

<ul>
  <li>Integração de OCR com APIs: Aprendemos como integrar a funcionalidade de OCR (Reconhecimento Óptico de Caracteres) em uma aplicação Node.js, utilizando a biblioteca Tesseract.js para extrair textos de imagens de placas e processá-los de maneira eficiente.</li>
  <li>Geração de PDFs em Aplicações Web: Foi interessante explorar a geração de arquivos PDF dinâmicos a partir de dados armazenados no banco de dados, utilizando a biblioteca PDFKit. Isso nos ajudou a entender melhor como manipular documentos dentro de uma aplicação web.</li>
  <li>Trabalhar com MongoDB: Ganhamos experiência na modelagem de dados e na interação com um banco de dados NoSQL, utilizando MongoDB. Aprendemos como fazer consultas, inserir e gerenciar registros, além de configurar variáveis de ambiente para facilitar o desenvolvimento.</li>
  <li>Desenvolvimento de APIs RESTful: Este projeto reforçou nossos conhecimentos em desenvolvimento de APIs RESTful com Node.js e Express, incluindo boas práticas de estruturação de rotas, middleware, e manipulação de dados.</li>
  <li>Deploy em Vercel: A experiência de hospedar o projeto no Vercel foi valiosa, proporcionando uma visão prática sobre o fluxo de deploy contínuo e como gerenciar um ambiente de produção para aplicações Node.js.</li>
</ul>

<hr>

🤝 Colaboradores
 <ul>
      <li>Cicero Lucas: </li> 
      <li>Dayanne: </li> 
      <li>Rosemelry: </li> 
    </ul>




