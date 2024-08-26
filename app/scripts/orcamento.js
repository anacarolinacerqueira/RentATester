let tipoPlataforma;
let tipoTeste;
let inputTempo;
let inputQtdPessoas;
let inputHorasDia;
let orcamento;

function validarSelecaoPlataforma() { 
    if(document.getElementById('web').checked) {
        tipoPlataforma = 0.15;
        console.log(tipoPlataforma);
        document.getElementById("msg-plataforma").innerHTML
            = "Você selecionou a plataforma do tipo Web. Vamos continuar :)";
    }
    else if(document.getElementById('mobile').checked) {
        tipoPlataforma = 0.4;
        console.log(tipoPlataforma);
        document.getElementById("msg-plataforma").innerHTML
            = "Você selecionou a plataforma do tipo Mobile. Vamos continuar :)"; 
    }
    else if(document.getElementById('desktop').checked) {
        tipoPlataforma = 0.1;
        console.log(tipoPlataforma);
        document.getElementById("msg-plataforma").innerHTML
            = "Você selecionou a plataforma do tipo Desktop. Vamos continuar :)";  
    }
}

function validarSelecaoTipoTeste() { 
    if(document.getElementById('humanos').checked) {
        tipoTeste = 150;
        console.log(tipoTeste)
        document.getElementById("msg-tipoteste").innerHTML
            = "Legal, você selecionou a opção de Testes Humanos!";
    }
    else if(document.getElementById('multidao').checked) {
        tipoTeste = 50;
        console.log(tipoTeste)
        document.getElementById("msg-tipoteste").innerHTML
            = "Legal, você selecionou a opção de Testes de Multidão!"; 
    }
    else if(document.getElementById('ia').checked) {
        tipoTeste = 100;
        console.log(tipoTeste)
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

function validacaoItensTestesHumanos(){

    inputTempo = document.getElementById('tempo-projeto').value;
    console.log(inputTempo);
    inputQtdPessoas = document.getElementById('quantidade-testers').value;
    console.log(inputQtdPessoas);
    inputHorasDia = document.getElementById('horas-dia').value;
    console.log(inputHorasDia);
    
    let msgHumanos = document.getElementById("validacoes-humanos");

    if ((inputTempo == '') || (inputTempo < 2)){
        msgHumanos.innerHTML
            = "O tempo mínimo para um projeto de testes humanos é de 2 dias :)";
            setTimeout(function () {
                //oculta mensagem de erro após 4 segundos
                msgHumanos.style.display='none';
            }, 4000);
    }

    else if ((inputQtdPessoas == '') || (inputQtdPessoas > 10)){
        msgHumanos.innerHTML
            = "É necessário selecionar entre 1 e 10 pessoas como testers.";
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
    else {
        /*document.getElementById("msg-continuar").innerHTML
            = "Você precisa preencher todos os campos para continuar!";
            setTimeout(function () {
                //oculta mensagem de erro após 3 segundos
                document.getElementById('msg-continuar').style.display='none';
            }, 3000);
        */
    }
}

function fazerOrcamento(){
    orcamento = (tipoTeste*(inputQtdPessoas*inputHorasDia*inputTempo))+((tipoTeste*(inputQtdPessoas*inputHorasDia*inputTempo))*tipoPlataforma);
    console.log(orcamento);
    document.getElementById('resultado').innerHTML = orcamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('seta-continuar').style = 'display:none';
    document.getElementById('texto-consultar').style = 'display:none';
}