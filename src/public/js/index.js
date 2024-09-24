// Função para exibir um alerta
const tela=document.getElementById("res")
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

// Alerta de sucesso no cadastro de placa
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

// Atualiza o action do formulário de consulta com base na placa
document.getElementById('consultaForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const placa = document.getElementById('consulta').value;
    if (placa) {
        try {
            const response = await fetch(`/consulta/${placa}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                showAlert('Consulta realizada com sucesso!'); 
                console.log(data)// Exibe alerta de sucesso
                tela.innerHTML=JSON.stringify(data)
            } else {
                showAlert('Erro ao realizar a consulta.', 'error');
            }
        } catch (error) {
            showAlert('Erro ao realizar a consulta.', 'error');
            console.error('Erro:', error);
        }
    }
});

// Atualiza o action do formulário de consulta com base na cidade
document.getElementById('consultaForm2').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const cidade = document.getElementById('consulta2').value;
if (cidade) {
    try {
        console.log(cidade);
        const response = await fetch(`/relatorio/cidade/${cidade}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`, // Inclua o token se necessário
                'Content-Type': 'application/json' // Mantenha este header, já que a API espera isso
            }
        });

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
        showAlert('Erro ao gerar o relatório.', 'error');
        console.error('Erro:', error);
    }
}

});

// Exibe e oculta resultados após um tempo
function showResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = data;
    resultsContainer.classList.remove('hidden');
    setTimeout(() => {
        resultsContainer.classList.add('hidden');
    }, 5000); // Oculta após 5 segundos
}

// Exemplo de uso: Mostrar dados na inicialização
document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const resultData = queryParams.get('resultData');
    if (resultData) {
        showResults(resultData);
        showAlert('Dados carregados com sucesso!'); // Exibe alerta de sucesso na inicialização
    }

    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('email1').value;
            const senha = document.getElementById('senha1').value;
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login realizado com sucesso!');
                sessionStorage.setItem('tokenAuthorization', data.token); // Armazena o token no sessionStorage
            } else {
                alert(data.msg);
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

            const response = await fetch('/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha, confirmsenha: confirmarSenha })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
            } else {
                alert(data.msg);
            }
        });
    }
});
