document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        const alerta = document.querySelector('.alerta');
        alerta.innerHTML = `
            <span class="fechar-alerta" onclick="this.parentElement.style.display='none';">&times;</span>
            <strong>Seja bem vindo(a), ${currentUser.nome}!</strong><br> Agora é possível conhecer nossos serviços e fazer um orçamento.
        `;
    }
    else{
        const alerta = document.querySelector('.alerta');
        alerta.innerHTML = `
            <span class="fechar-alerta" onclick="this.parentElement.style.display='none';">&times;</span>
            <strong>Seja bem vindo(a), Tester!</strong><br> Agora é possível conhecer nossos serviços e fazer um orçamento.
        `;
    }
});

function rotaOrcamento() {
    window.location.assign('orcamento.html');
}
