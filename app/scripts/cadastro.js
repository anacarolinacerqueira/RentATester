document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault();

        document.querySelectorAll('.error-message').forEach(function(element) {
            element.textContent = '';
            element.style.color = ''; 
            element.style.fontWeight = '';
            element.style.fontSize = '';
        });

        let isValid = true;

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value.trim();
        const senha = document.getElementById('senha').value;
        const repitaSenha = document.getElementById('repitaSenha').value;

        function setError(elementId, message) {
            const element = document.getElementById(elementId);
            element.textContent = message;
            element.style.color = 'red'; 
            element.style.fontWeight = 'bold';
            element.style.fontSize = '12px';
        }

        if (!nome || nome.length < 3) {
            setError('nomeError', 'É necessário informar um nome válido!');
            isValid = false;
        }

        if (!email) {
            setError('emailError', 'É necessário informar o e-mail!');
            isValid = false;
        }

        if (!estado || estado === 'Selecione') {
            setError('estadoError', 'Selecione um estado válido!');
            isValid = false;
        }

        if (!senha || senha.length < 6) {
            setError('senhaError', 'A senha precisa ter no mínimo 6 caracteres!');
            isValid = false;
        }

        if (!repitaSenha) {
            setError('repitaSenhaError', 'Você precisa repetir a senha!');
            isValid = false;
        }

        if (senha && repitaSenha && senha !== repitaSenha) {
            setError('repitaSenhaError', 'As senhas não coincidem!');
            isValid = false;
        }

        if (isValid) {
            let users = JSON.parse(localStorage.getItem('users')) || [];

            let newUser = {
                nome: nome,
                email: email,
                senha: senha
            };

            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));

            document.getElementById('successMessage').textContent = 'Cadastro realizado com sucesso!';
            
            setTimeout(function() {
                window.location.assign('index.html');
            }, 5000);
        } else {
            document.getElementById('successMessage').textContent = '';
        }
    });
});
