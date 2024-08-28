document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Limpa mensagens de erro antes de validar novamente
        document.querySelectorAll('.error-message').forEach(function(element) {
            element.textContent = '';
            element.style.color = ''; // Reseta o estilo da cor
            element.style.fontWeight = ''; // Reseta o estilo do negrito
            element.style.fontSize = ''; // Reseta o tamanho da fonte
        });

        let isValid = true;

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value.trim();
        const senha = document.getElementById('senha').value;
        const repitaSenha = document.getElementById('repitaSenha').value;

        // Função auxiliar para definir a mensagem de erro com estilo
        function setError(elementId, message) {
            const element = document.getElementById(elementId);
            element.textContent = message;
            element.style.color = 'red'; // Cor da fonte vermelha
            element.style.fontWeight = 'bold'; // Formatação em negrito
            element.style.fontSize = '12px'; // Tamanho da fonte 12 pixels
        }

        if (!nome || nome.length < 10) {
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
            // Recupera os usuários existentes do localStorage
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Cria um novo objeto de usuário
            let newUser = {
                nome: nome,
                email: email,
                senha: senha
            };

            // Adiciona o novo usuário ao array
            users.push(newUser);

            // Salva o array atualizado no localStorage
            localStorage.setItem('users', JSON.stringify(users));

            document.getElementById('successMessage').textContent = 'Cadastro realizado com sucesso!';
            
            setTimeout(function() {
                window.location.assign('index.html');
            }, 3000);
        } else {
            document.getElementById('successMessage').textContent = '';
        }
    });
});
