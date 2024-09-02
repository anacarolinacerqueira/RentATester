document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[id="form-login"]');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
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

    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === loginInput && user.senha === senhaInput);
    
    if (loginInput === 'rent@tester.com' && senhaInput === '123456') {
        window.location.assign('home.html');
    }
    else if (loginInput === '' && senhaInput === '') {
        mensagemErro.textContent = 'É preciso informar o e-mail e a senha para fazer login!';
    } else if (loginInput === '') {
        mensagemErro.textContent = 'É preciso informar o e-mail para fazer login!';
    } else if (senhaInput === '') {
        mensagemErro.textContent = 'É preciso informar a senha para fazer login!';
    } else if (!user) {
        mensagemErro.textContent = 'E-mail ou senha incorretos. Por favor, verifique suas credenciais!';
    }
    else {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.assign('home.html');
    }
}