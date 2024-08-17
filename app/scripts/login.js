document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[id="form-login"]');
    
    form.addEventListener('submit', function(event) {
        validarLogin();
    });
});

function validarLogin() {
    const loginInput = document.getElementById('login').value.trim();
    const senhaInput = document.getElementById('senha').value.trim();
    const form = document.querySelector('form[id="form-login"]');
    const mensagemErro = document.getElementById('mensagemErro');
    mensagemErro.style.color = 'red';
    mensagemErro.style.fontSize = '12px';
    mensagemErro.style.marginLeft = "23%"

    if (loginInput === '' && senhaInput === '') {
        mensagemErro.textContent = 'É preciso informar o usuário e a senha';
    } else if (loginInput === '') {
        mensagemErro.textContent = 'É preciso informar o usuário';
    } else if (senhaInput === '') {
        mensagemErro.textContent = 'É preciso informar a senha';
    } else if (loginInput !== 'teste' || senhaInput !== 'tcc') {
        mensagemErro.textContent = 'Usuário ou senha incorretos. Por favor, verifique suas credenciais!';
    } else {
        window.location.assign('home.html');
        return;
    }
}