let tipoPlataforma;
let tipoTeste;
let inputTempo;
let inputQtdPessoas;
let inputHorasDia;
let orcamento;

function validarSelecaoPlataforma() {
    if (document.getElementById('web').checked) {
        tipoPlataforma = 0.15;
        document.getElementById("msg-plataforma").innerHTML = "Você selecionou a plataforma do tipo Web. Vamos continuar :)";
    } else if (document.getElementById('mobile').checked) {
        tipoPlataforma = 0.4;
        document.getElementById("msg-plataforma").innerHTML = "Você selecionou a plataforma do tipo Mobile. Vamos continuar :)";
    } else if (document.getElementById('desktop').checked) {
        tipoPlataforma = 0.1;
        document.getElementById("msg-plataforma").innerHTML = "Você selecionou a plataforma do tipo Desktop. Vamos continuar :)";
    }
}

function validarSelecaoTipoTeste() {
    if (document.getElementById('humanos').checked) {
        tipoTeste = 150;
        document.getElementById("msg-tipoteste").innerHTML = "Legal, você selecionou a opção de Testes Humanos!";
    } else if (document.getElementById('multidao').checked) {
        tipoTeste = 50;
        document.getElementById("msg-tipoteste").innerHTML = "Legal, você selecionou a opção de Testes de Multidão!";
    } else if (document.getElementById('ia').checked) {
        tipoTeste = 100;
        document.getElementById("msg-tipoteste").innerHTML = "Legal, você selecionou a opção de Testes Assistidos por IA!";
    } else if (document.getElementById('personalizado').checked) {
        tipoTeste = null; 
        exibirAlertaPersonalizado();
        return; 
    }
}

function validacaoEscopoTestes() {
    inputTempo = document.getElementById('tempo-projeto').value;
    inputQtdPessoas = document.getElementById('quantidade-testers').value;
    inputHorasDia = document.getElementById('horas-dia').value;

    let msgEscopo = document.getElementById("validacoes-escopo");

    if (inputTempo === '' || inputTempo < 5) {
        msgEscopo.innerHTML = "O tempo mínimo para um projeto de testes é 5 dias.";
        msgEscopo.style.display = 'block';
        setTimeout(function () {
            msgEscopo.style.display = 'none';
        }, 3000);
        return false;
    }

    if (inputQtdPessoas === '' || inputQtdPessoas > 50 || inputQtdPessoas < 1) {
        msgEscopo.innerHTML = "É necessário selecionar entre 1 e 50 testadores.";
        msgEscopo.style.display = 'block';
        setTimeout(function () {
            msgEscopo.style.display = 'none';
        }, 3000);
        return false;
    }

    if (inputHorasDia === '' || inputHorasDia <= 0 || inputHorasDia > 10) {
        msgEscopo.innerHTML = "O máximo de tempo de trabalho por dia é 10 horas.";
        msgEscopo.style.display = 'block';
        setTimeout(function () {
            msgEscopo.style.display = 'none';
        }, 3000);
        return false;
    }

    msgEscopo.innerHTML = '';
    return true;
}

function exibirAlertaPersonalizado() {
    alert("Para um serviço personalizado, entre em contato pelo nosso telefone: 4002-8922.");
    location.reload();
}

function validarPreenchimento() {
    if (tipoTeste === null) return true; 

    if (!tipoPlataforma || !tipoTeste || inputTempo === '' || inputQtdPessoas === '' || inputHorasDia === '') {
        document.getElementById("msg-continuar").innerHTML = "Você precisa preencher todos os campos para continuar!";
        document.getElementById('msg-continuar').style.display = 'block';
        setTimeout(function () {
            document.getElementById('msg-continuar').style.display = 'none';
        }, 3000);
        return false;
    }

    return true;
}

function calcularOrcamento() {
    orcamento = (tipoTeste * (inputQtdPessoas * inputHorasDia * inputTempo)) + ((tipoTeste * (inputQtdPessoas * inputHorasDia * inputTempo)) * tipoPlataforma);
    document.getElementById('resultado').innerHTML = orcamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('novo-orcamento').innerHTML = "Fazer um novo Orçamento";
    document.getElementById('seta-continuar').style.display = 'none';
    document.getElementById('texto-consultar').style.display = 'none';
}

function fazerOrcamento() {
    validarSelecaoTipoTeste();
    if (tipoTeste === null) {
        return;
    }

    if (!validarPreenchimento()) {
        return; 
    }

    if (!validacaoEscopoTestes()) {
        return; 
    }
    calcularOrcamento();
}