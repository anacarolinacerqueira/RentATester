function validarForm() {
    var nome = document.getElementById("nome-contato").value;
    var email = document.getElementById("email-contato").value;
    var mensagem = document.getElementById("mensagem-contato").value;

    if (nome === "" || email === "" || mensagem === "") {
        alert("Todos os campos marcados com '*' são obrigatórios. Por favor, preencha todos os campos.");
        return false; // Impede o envio do formulário
    } else {
        alert("Sua mensagem foi enviada. Retornaremos em breve!");
    }

    // Se todos os campos estiverem preenchidos, o formulário será enviado
    return true;
}
