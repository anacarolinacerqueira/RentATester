describe('Acesso à Página Home', () => {
    const url = 'https://rentatester.netlify.app';
    const homeUrl = 'https://rentatester.netlify.app/home';
    const validEmail = 'rent@tester.com';
    const validPassword = '123456';

    beforeEach(() => {
        // Faz login antes de cada teste
        cy.visit(url);
        cy.get('#login').type(validEmail);
        cy.get('#senha').type(validPassword);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/home.html');
    });

    it('Deve exibir a mensagem de boas-vindas personalizada para o usuário logado', () => {
        cy.get('.alerta').should('contain', 'Seja bem vindo(a), Tester!');
    });

    it('Deve fechar a mensagem de alerta ao clicar no botão de fechar', () => {
        cy.get('.alerta .fechar-alerta').click();
        cy.get('.alerta').should('not.be.visible');
    });

    it('Deve verificar a presença dos elementos principais da página home', () => {
        cy.get('header img[alt="logo do RentATester"]').should('be.visible');
        cy.get('#texto-sobre').should('contain', 'Na Rent A Tester, somos especialistas em garantir a qualidade do seu software.');
        cy.get('#img-home').should('have.attr', 'src', 'assets/img/woman-developer.jpg');
        cy.get('#servicos').should('be.visible');
    });

    it('Deve verificar a presença do botão de orçamento', () => {
        cy.get('#orcamento').should('be.visible').and('contain', 'FAZER ORÇAMENTO');
    });

    it('Deve navegar para a página de orçamento ao clicar no botão de orçamento', () => {
        cy.get('#orcamento').click();
        cy.url().should('include', '/orcamento.html');
    });
});
