document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[id="form-login"]');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário padrão
        validarLogin();
    });
});

function validarLogin() {
    const loginInput = document.getElementById('login').value.trim();
    const senhaInput = document.getElementById('senha').value.trim();
    const mensagemErro = document.getElementById('mensagemErro');
    mensagemErro.style.color = 'red';
    mensagemErro.style.fontSize = '12px';
    mensagemErro.style.textAlign = 'center';

    // Obtém a lista de usuários armazenados no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o e-mail e a senha inseridos correspondem a algum usuário armazenado
    const user = users.find(user => user.email === loginInput && user.senha === senhaInput);

    // Valida as entradas do usuário
    if (loginInput === '' && senhaInput === '') {
        mensagemErro.textContent = 'É preciso informar o e-mail e a senha para fazer login!';
    } else if (loginInput === '') {
        mensagemErro.textContent = 'É preciso informar o e-mail para fazer login!';
    } else if (senhaInput === '') {
        mensagemErro.textContent = 'É preciso informar a senha para fazer login!';
    } else if (!user) {
        mensagemErro.textContent = 'E-mail ou senha incorretos. Por favor, verifique suas credenciais!';
    } else {
        // Salva o nome do usuário no localStorage para ser usado na home
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        window.location.assign('home.html'); // Redireciona para a página inicial
    }
}