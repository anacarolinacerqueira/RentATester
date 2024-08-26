function validarSelecaoPlataforma() { 
    if(document.getElementById('web').checked) {
        document.getElementById("msg-plataforma").innerHTML
            = "Você selecionou a plataforma do tipo Web. Vamos continuar :)";
    }
    else if(document.getElementById('mobile').checked) {
        document.getElementById("msg-plataforma").innerHTML
            = "Você selecionou a plataforma do tipo Mobile. Vamos continuar :)"; 
    }
    else if(document.getElementById('desktop').checked) {
        document.getElementById("msg-plataforma").innerHTML
            = "Você selecionou a plataforma do tipo Desktop. Vamos continuar :)";  
    }
}

function validarSelecaoTipoTeste() { 
    if(document.getElementById('humanos').checked) {
        document.getElementById("msg-tipoteste").innerHTML
            = "Legal, você selecionou a opção de Testes Humanos!";
    }
    else if(document.getElementById('multidao').checked) {
        document.getElementById("msg-tipoteste").innerHTML
            = "Legal, você selecionou a opção de Testes de Multidão!"; 
    }
    else if(document.getElementById('ia').checked) {
        document.getElementById("msg-tipoteste").innerHTML
            = "Legal, você selecionou a opção de Testes Assistidos por IA!";  
    }
    else {
        document.getElementById("msg-tipoteste").innerHTML
            = "Legal, você quer um projeto personalizado!";
    }
}

function exibirAlertaPersonalizado(){
    alert("Para um serviço personalizado, entre em contato pelo nosso telefone: 4002-8922.")
}

function gerenciarVisibilidade(){
    document.getElementById('perguntasHumanos').style.display(none);
}

function validacaoItensTestesHumanos(){

    let inputTempo = document.getElementById('tempo-projeto').value;
    let inputQtdPessoas = document.getElementById('quantidade-testers').value;
    let inputHorasDia = document.getElementById('horas-dia').value;
    let msgHumanos = document.getElementById("validacoes-humanos");

    if ((inputTempo == '') || (inputTempo < 2)){
        msgHumanos.innerHTML
            = "O tempo mínimo para um projeto de testes humanos é de 2 dias :)";
            setTimeout(function () {
                //oculta mensagem de erro após 4 segundos
                msgHumanos.style.display='none';
            }, 4000);
    }

    else if ((inputQtdPessoas == '') || (inputQtdPessoas > 5)){
        msgHumanos.innerHTML
            = "É necessário selecionar entre 1 e 5 pessoas como testers.";
            setTimeout(function () {
                //oculta mensagem de erro após 4 segundos
                msgHumanos.style.display='none';
            }, 4000);
    }

    else if ((inputHorasDia == '') || (inputHorasDia > 10)){
        msgHumanos.innerHTML
            = "O máximo de tempo por dia para testes humanos, é de 10 horas.";
            setTimeout(function () {
                //oculta mensagem de erro após 4 segundos
                msgHumanos.style.display='none';
            }, 4000);
    }
    else {
        fazerOrcamento();
    }
}

function validarSelecaoForm(){
    if (document.getElementById('personalizado').checked){
        exibirAlertaPersonalizado();
        location.reload()
    }
    else if (document.getElementById('humanos').checked){
       ;

    } else {
        document.getElementById("msg-continuar").innerHTML
            = "Você precisa preencher todos os campos para continuar!";
            setTimeout(function () {
                //oculta mensagem de erro após 3 segundos
                document.getElementById('msg-continuar').style.display='none';
            }, 3000);
    }
}

function fazerOrcamento(){
    const baseHumanos = 150;
    const baseMultidao = 50;
    const baseIA = 100
    const porcentMobile = 0.4;
    const porcentWeb = 0.15;
    const porcentDesktop = 0.1

}