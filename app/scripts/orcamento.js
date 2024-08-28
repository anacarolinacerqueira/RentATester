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

function validacaoEscopoTestes(){

    inputTempo = document.getElementById('tempo-projeto').value;
    console.log(inputTempo);
    inputQtdPessoas = document.getElementById('quantidade-testers').value;
    console.log(inputQtdPessoas);
    inputHorasDia = document.getElementById('horas-dia').value;
    console.log(inputHorasDia);
    
    let msgEscopo = document.getElementById("validacoes-escopo");

    if ((inputTempo == '') || (inputTempo < 5)){
        msgEscopo.innerHTML
            = "O tempo mínimo para um projeto de testes humanos é 5 dias.";
            setTimeout(function () {
                msgEscopo.style.display='none';
            }, 4000);
    }

    else if ((inputQtdPessoas == '') || (inputQtdPessoas > 10 && inputQtdPessoas < 1)){
        msgEscopo.innerHTML
            = "É necessário selecionar entre 1 e 10 testadores.";
            setTimeout(function () {
                msgEscopo.style.display='none';
            }, 4000);
    }

    else if ((inputHorasDia == '') || (inputHorasDia > 10)){
        msgEscopo.innerHTML
            = "O máximo de tempo de trabalho por dia é 10 horas.";
            setTimeout(function () {
                msgEscopo.style.display='none';
            }, 4000);
    }
    else {
        return;
    }
}

function exibirAlertaPersonalizado(){
    alert("Para um serviço personalizado, entre em contato pelo nosso telefone: 4002-8922.")
}

function calcularOrcamento(){
    orcamento = (tipoTeste*(inputQtdPessoas*inputHorasDia*inputTempo))+((tipoTeste*(inputQtdPessoas*inputHorasDia*inputTempo))*tipoPlataforma);
    console.log(orcamento);
    document.getElementById('resultado').innerHTML = orcamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('seta-continuar').style = 'display:none';
    document.getElementById('texto-consultar').style = 'display:none';
}

function fazerOrcamento(){
    validacaoEscopoTestes();

    if (document.getElementById('personalizado').checked){
        exibirAlertaPersonalizado();
        location.reload()
    }
    else if (tipoTeste == undefined || tipoPlataforma == undefined || inputTempo == '' || inputQtdPessoas == '' || inputHorasDia == ''){
        document.getElementById("msg-continuar").innerHTML
            = "Você precisa preencher todos os campos para continuar!";
            setTimeout(function () {
                //oculta mensagem de erro após 3 segundos
                document.getElementById('msg-continuar').style.display='none';
            }, 3000);
    } else
    calcularOrcamento();
}