 // Função para exibir um alerta
 const tela = document.getElementById("res");

 function showAlert(message, type = 'success') {
     const alertContainer = document.getElementById('alert-container');
     alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
     alertContainer.classList.remove('hidden');
     setTimeout(() => {
         alertContainer.classList.add('hidden');
     }, 5000); // Oculta o alerta após 5 segundos
 }

 // Recupera o token do sessionStorage
 function getToken() {
     return sessionStorage.getItem('tokenAuthorization');
 }

 // Exibe e oculta resultados após um tempo
 function showResults(data) {
     const resultsContainer = document.getElementById('results');
     resultsContainer.innerHTML = data;
     resultsContainer.classList.remove('hidden');
     setTimeout(() => {
         resultsContainer.classList.add('hidden');
     }, 5000); // Oculta após 5 segundos
 }

 // Funções de loading
 function showLoading() {
     const loadingDiv = document.createElement('div');
     loadingDiv.id = 'loading';
     loadingDiv.innerHTML = 'Carregando...';
     document.body.appendChild(loadingDiv);
 }

 function hideLoading() {
     const loadingDiv = document.getElementById('loading');
     if (loadingDiv) {
         document.body.removeChild(loadingDiv);
     }
 }

 // Formulário de cadastro de placa
 document.getElementById('placaForm').addEventListener('submit', function(event) {
     event.preventDefault(); // Evita o envio padrão do formulário

     const formData = new FormData(this);
     fetch(this.action, {
         method: 'POST',
         body: formData
     }).then(response => {
         if (response.ok) {
             showAlert('Placa cadastrada com sucesso!'); // Exibe alerta de sucesso
             this.reset(); // Reseta o formulário após o cadastro
         } else {
             showAlert('Erro ao cadastrar a placa.', 'error'); // Exibe alerta de erro
         }
     }).catch(error => {
         showAlert('Erro ao cadastrar a placa.', 'error'); // Exibe alerta de erro em caso de falha
         console.error('Erro:', error);
     });
 });

 // Formulário de consulta de placa
 document.getElementById('consultaForm').addEventListener('submit', async function(event) {
     event.preventDefault(); // Evita o envio padrão do formulário

     const placa = document.getElementById('consulta').value;
     if (placa) {
         try {
             showLoading();
             const response = await fetch(`/consulta/${placa}`, {
                 method: 'GET',
                 headers: {
                     'Authorization': `Bearer ${getToken()}`,
                     'Content-Type': 'application/json'
                 }
             });

             hideLoading();
             if (response.ok) {
                 const data = await response.json();
                 showAlert('Consulta realizada com sucesso!');
                 console.log(data);
                 tela.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
             } else {
                 showAlert('Erro ao realizar a consulta.', 'error');
             }
         } catch (error) {
             showAlert('Erro ao realizar a consulta.', 'error');
             console.error('Erro:', error);
         }
     }
 });

 // Formulário de consulta de relatório por cidade
 document.getElementById('consultaForm2').addEventListener('submit', async function(event) {
     event.preventDefault(); // Evita o envio padrão do formulário

     const cidade = document.getElementById('consulta2').value;
     if (cidade) {
         try {
             showLoading();
             console.log(cidade);
             const response = await fetch(`/relatorio/cidade/${cidade}`, {
                 method: 'GET',
                 headers: {
                     'Authorization': `Bearer ${getToken()}`, 
                     'Content-Type': 'application/json'
                 }
             });

             hideLoading();
             if (response.ok) {
                 const contentType = response.headers.get('Content-Type');
                 if (contentType.includes('application/pdf')) {
                     const blob = await response.blob();
                     const url = window.URL.createObjectURL(blob);
                     const a = document.createElement('a');
                     a.href = url;
                     a.download = `relatorio_${cidade}.pdf`; // Nome sugerido para o arquivo
                     document.body.appendChild(a);
                     a.click(); // Dispara o download do PDF
                     document.body.removeChild(a); // Remove o link da página
                     showAlert('Relatório gerado com sucesso!');
                 } else {
                     showAlert('Erro: formato de resposta não é PDF.', 'error');
                 }
             } else {
                 showAlert('Erro ao gerar o relatório.', 'error');
             }
         } catch (error) {
             hideLoading();
             showAlert('Erro ao gerar o relatório.', 'error');
             console.error('Erro:', error);
         }
     }
 });

 // Exemplo de uso: Mostrar dados na inicialização
 document.addEventListener('DOMContentLoaded', () => {
     const queryParams = new URLSearchParams(window.location.search);
     const resultData = queryParams.get('resultData');
     if (resultData) {
         showResults(resultData);
         showAlert('Dados carregados com sucesso!');
     }

     const loginForm = document.getElementById('loginForm');
     const cadastroForm = document.getElementById('cadastroForm');

     if (loginForm) {
         loginForm.addEventListener('submit', async function(event) {
             event.preventDefault();
             const email = document.getElementById('email1').value;
             const senha = document.getElementById('senha1').value;
             showLoading();
             const response = await fetch('/login', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ email, senha })
             });
             hideLoading();

             const data = await response.json();
             if (response.ok) {
                 showAlert('Login realizado com sucesso!');
                 sessionStorage.setItem('tokenAuthorization', data.token); // Armazena o token no sessionStorage
             } else {
                 showAlert(data.msg, 'error');
             }
         });
     }

     if (cadastroForm) {
         cadastroForm.addEventListener('submit', async function(event) {
             event.preventDefault();

             const nome = document.getElementById('nome2').value;
             const email = document.getElementById('email2').value;
             const senha = document.getElementById('senha2').value;
             const confirmarSenha = document.getElementById('confirmar1').value;
             showLoading();
             const response = await fetch('/cadastro', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ nome, email, senha, confirmsenha: confirmarSenha })
             });
             hideLoading();

             const data = await response.json();
             if (response.ok) {
                 showAlert('Cadastro realizado com sucesso!');
             } else {
                 showAlert(data.msg, 'error');
             }
         });
     }
 });
