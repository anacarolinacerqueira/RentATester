document.addEventListener('DOMContentLoaded', function() {
    // Obtém o usuário atual do localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // Exibe o alerta com o nome do usuário
        const alerta = document.querySelector('.alerta');
        alerta.innerHTML = `
            <span class="fechar-alerta" onclick="this.parentElement.style.display='none';">&times;</span>
            <strong>Seja bem vindo(a), ${currentUser.nome}!</strong><br> Agora é possível conhecer nossos serviços e fazer um orçamento.
        `;
    }
});

function rotaOrcamento() {
    window.location.assign('orcamento.html');
}
