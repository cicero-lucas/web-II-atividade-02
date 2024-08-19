# web-II-atividade-02

[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E


<h2> Titlulo:  </h2>


Atividade 02 web II

***


![javaScript]

<p align="center">
 <a href="#about">Sobre</a> • • 
  <a href="#fucionalidade">Funcionalidade</a> • • 
 <a href="#inicio">Começando</a> • • 
 <a href="#usar">Como Usar</a> • • 
 <a href="#dificudade"> Dificuldades Conhecidas </a> 
</p>

<h2 id="about">📌 Sobre</h2>

<p>
Este projeto é uma API desenvolvida em Node.js e Express, com o objetivo de reconhecer e armazenar informações de placas de veículos utilizando OCR (Reconhecimento Óptico de Caracteres). A API permite o cadastro de placas a partir de imagens enviadas pelos usuários e mantém registros com informações como a cidade, data e hora do registro em um banco de dados MongoDB. Além disso, a API é capaz de gerar relatórios em PDF com os registros das placas de uma cidade específica.
</p>

<h2 id="fucionalidade"> 📌 Funcionalidades </h2>

<ul>
  <li>Cadastro de Placas: Rota POST /cadastroPlaca que permite o envio de uma foto de uma placa de veículo, juntamente com o nome da cidade. A API utiliza OCR para reconhecer a placa na imagem e armazena as informações no banco de dados MongoDB.</li>
  <li>Relatório por Cidade: Rota GET /relatorio/cidade/:cidade que gera um relatório em PDF com todas as placas registradas de uma determinada cidade, contendo informações como número da placa, cidade, data e hora do registro.</li>
  <li>Consulta de Placas: Rota GET /consulta/:placa que verifica se uma determinada placa está cadastrada no banco de dados.</li>
</ul>

<ul>
<!--   <li> Cadastro de novos registros usando Local Storage.</li>
  <li> Edição de registros existentes </li>
  <li> Exclusão de registros </li>
  <li> Listagem de todos os registros cadastrados </li>
  <li> Download dos registros cadastrados </li> -->
</ul>

***

<h2 id="inicio">🚀 Tecnologias Utilizadas</h2>

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
<!--<h2 id="dificudade"> :heavy_exclamation_mark: Dificuldades Conhecidas </h2>-->
<hr>

🤝 Colaboradores
 <ul>
      <li>Cicero Lucas: </li> 
      <li>Dayanne: </li> 
      <li>Rosemelry: </li> 
    </ul>




