describe('Página Home', () => {
  beforeEach(() => {
    // Simula o login com credenciais válidas (ajuste o caminho se necessário)
    cy.visit('https://rentatester.netlify.app');
    cy.get('#login').type('rent@tester.com');
    cy.get('#senha').type('123456');
    cy.get('input[type="submit"]').click();
  });

  it('Deve exibir mensagem de boas-vindas personalizada', () => {
    cy.contains('Seja bem vindo(a), Tester!').should('be.visible');
  });

  it('Deve permitir fechar a mensagem de boas-vindas', () => {
    cy.contains('Seja bem vindo(a), Tester!').should('be.visible');
    cy.get('.fechar-alerta').click();
    cy.contains('Seja bem vindo(a), Tester!').should('not.exist');
  });

  it('Deve conter o botão "FAZER ORÇAMENTO"', () => {
    cy.contains('FAZER ORÇAMENTO').should('be.visible');
  });

  it('Deve redirecionar para a página de orçamento ao clicar no botão', () => {
    cy.contains('FAZER ORÇAMENTO').click();
    // Assumindo que a página de orçamento contém um título específico
    cy.url().should('include', 'orcamento');
    cy.contains('Página de Orçamento').should('be.visible');
  });

  // Caso o usuário esteja logado com um nome diferente, ajuste o teste a seguir
  it('Deve exibir mensagem de boas-vindas personalizada com o nome do usuário', () => {
    // Simula o login com um nome diferente
    cy.visit('https://rentatester.netlify.app');
    cy.get('#login').type('outroUsuario@example.com'); // Substitua por um email válido
    cy.get('#senha').type('senhaDoOutroUsuario'); // Substitua pela senha correta
    cy.get('input[type="submit"]').click();

    // Assuma que o nome do usuário logado seja "Outro Usuário"
    cy.contains('Seja bem vindo(a), Outro Usuário!').should('be.visible');
  });
});