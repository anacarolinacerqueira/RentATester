document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[data-cy="form-login"]');
    
    form.addEventListener('submit', function(event) {
        validarLogin();
    });
});

function validarLogin() {
    const loginInput = document.getElementById('login').value.trim();
    const senhaInput = document.getElementById('senha').value.trim();
    const form = document.querySelector('form[data-cy="form-login"]');
    const mensagemErro = document.createElement('p');
    mensagemErro.style.color = 'red';
    mensagemErro.style.fontSize = '12px'

    if (loginInput === '' && senhaInput === '') {
        mensagemErro.textContent = 'É preciso informar o login e a senha';
    } else if (loginInput === '') {
        mensagemErro.textContent = 'É preciso informar o login';
    } else if (senhaInput === '') {
        mensagemErro.textContent = 'É preciso informar a senha';
    } else if (loginInput !== 'teste' || senhaInput !== 'tcc') {
        mensagemErro.textContent = 'Login ou senha incorretos. Verifique suas credenciais :)';
    } else {
        window.Location.href = 'index.html';
        return;
    }

    
    const existingError = form.querySelector('p');
    if (existingError) {
        form.removeChild(existingError);
    }
    form.appendChild(mensagemErro);
}
