
// Atualiza o action do formulário de consulta com base na placa
document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const placa = document.getElementById('consulta').value;
    if (placa) {
        console.log(placa)
        this.action = `/consulta/${placa}`;
        this.submit(); // Envia o formulário
    }
});
document.getElementById('consultaForm2').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    const placa = document.getElementById('consulta2').value;
       console.log(placa)
    if (placa) {
     
        this.action = `/relatorio/cidade/${placa}`;
        this.submit(); // Envia o formulário
    }
});

// Função para exibir e ocultar resultados após um tempo
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
    }
});
