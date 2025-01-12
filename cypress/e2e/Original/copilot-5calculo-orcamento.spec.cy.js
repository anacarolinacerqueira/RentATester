describe('Cálculo de Orçamento', () => {
    const loginUrl = 'https://rentatester.netlify.app';
    const homeUrl = 'https://rentatester.netlify.app/home';
    const orcamentoUrl = 'https://rentatester.netlify.app/orcamento.html';
    const validEmail = 'rent@tester.com';
    const validPassword = '123456';

    beforeEach(() => {
        // Faz login antes de cada teste e navega para a página de orçamento
        cy.visit(loginUrl);
        cy.get('#login').type(validEmail);
        cy.get('#senha').type(validPassword);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/home.html');
        cy.get('#orcamento').click();
        cy.url().should('include', '/orcamento.html');
    });

    function calcularOrcamento(tipoTeste, tipoPlataforma, tempo, qtdPessoas, horasDia) {
        return (tipoTeste * (qtdPessoas * horasDia * tempo)) + ((tipoTeste * (qtdPessoas * horasDia * tempo)) * tipoPlataforma);
    }

    const testCases = [
        {
            plataforma: 'web',
            tipoPlataforma: 0.15,
            tipoTeste: 'humanos',
            valorTipoTeste: 150,
            tempo: 10,
            qtdPessoas: 5,
            horasDia: 8,
            orcamentoEsperado: calcularOrcamento(150, 0.15, 10, 5, 8)
        },
        {
            plataforma: 'mobile',
            tipoPlataforma: 0.4,
            tipoTeste: 'multidao',
            valorTipoTeste: 50,
            tempo: 20,
            qtdPessoas: 10,
            horasDia: 6,
            orcamentoEsperado: calcularOrcamento(50, 0.4, 20, 10, 6)
        },
        {
            plataforma: 'desktop',
            tipoPlataforma: 0.1,
            tipoTeste: 'ia',
            valorTipoTeste: 100,
            tempo: 15,
            qtdPessoas: 8,
            horasDia: 7,
            orcamentoEsperado: calcularOrcamento(100, 0.1, 15, 8, 7)
        }
    ];

    testCases.forEach(({ plataforma, tipoPlataforma, tipoTeste, valorTipoTeste, tempo, qtdPessoas, horasDia, orcamentoEsperado }) => {
        it(`Deve calcular o orçamento corretamente para plataforma ${plataforma} e teste ${tipoTeste}`, () => {
            cy.get(`#${plataforma}`).click();
            cy.get(`#${tipoTeste}`).click();
            cy.get('#tempo-projeto').type(`${tempo}`);
            cy.get('#quantidade-testers').type(`${qtdPessoas}`);
            cy.get('#horas-dia').type(`${horasDia}`);
            cy.get('#seta-continuar').click();
            cy.get('#resultado').should('contain', orcamentoEsperado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        });
    });
});