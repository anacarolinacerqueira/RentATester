describe('Home Page Tests - RentATester', () => {
  const validEmail = 'rent@tester.com';
  const validPassword = '123456';
  const userName = 'Tester';
 
  beforeEach(() => {
    // Realizar login antes de cada teste
    cy.visit('https://rentatester.netlify.app/login');
    cy.get('#email').type(validEmail);
    cy.get('#senha').type(validPassword);
    cy.get('#login').click();
    cy.url().should('include', '/home');
  });
 
  it('Deve exibir alerta de boas-vindas com nome do usuário', () => {
    cy.get('.alerta')
      .should('be.visible')
      .and('contain', `Seja bem vindo(a), ${userName}!`);
  });
 
  it('Deve permitir fechar o alerta de boas-vindas', () => {
    cy.get('.alerta .fechar-alerta').click();
    cy.get('.alerta').should('not.be.visible');
  });
 
  it('Deve conter botão de orçamento funcional', () => {
    cy.get('#orcamento')
      .should('be.visible')
      .and('contain', 'FAZER ORÇAMENTO')
      .click();
    cy.url().should('include', '/orcamento.html');
  });
 
  it('Deve verificar elementos principais da página', () => {
    // Verificar cabeçalho
    cy.get('header a img').should('be.visible');
    cy.get('#texto-sobre').should('contain', 'Na Rent A Tester, somos especialistas');
 
    // Verificar imagem principal
    cy.get('#img-home').should('be.visible');
 
    // Verificar seção de serviços
    cy.get('#servicos .row .column').should('have.length', 3);
    cy.get('#servicos h2').should('contain', 'TESTES HUMANOS');
    cy.get('#servicos h2').should('contain', 'TESTES DE MULTIDÃO');
    cy.get('#servicos h2').should('contain', 'TESTES ASSISTIDOS POR IA');
  });
 
  it('Deve verificar responsividade básica', () => {
    cy.viewport('iphone-6');
    cy.get('header').should('be.visible');
    cy.get('#servicos .row').should('be.visible');
    cy.get('#orcamento').should('be.visible');
  });
 
  it('Deve conter footer com copyright', () => {
    cy.get('footer')
      .should('be.visible')
      .and('contain', '© 2024 - RentATester');
  });
 });