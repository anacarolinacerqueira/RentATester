describe('Teste de acesso à home', () => {
  beforeEach(() => {
    // Realiza login com credenciais válidas
    cy.visit('https://rentatester.netlify.app');
    cy.get('#login').type('rent@tester.com');
    cy.get('#senha').type('123456');
    cy.get('input[type="submit"]').click();
  });

  it('Deve acessar a home após login', () => {
    // Verifica se o redirecionamento ocorreu corretamente para a home
    cy.url().should('include', '/home');
  });

  it('Deve exibir o alerta de boas-vindas com o nome do usuário', () => {
    // Verifica se o alerta de boas-vindas contém o nome do usuário
    cy.get('.alerta').should('be.visible');
    cy.get('.alerta').should('contain.text', '\n            ×\n            Seja bem vindo(a), Tester! Agora é possível conhecer nossos serviços e fazer um orçamento.\n       ');
  });

  it('Deve permitir fechar o alerta de boas-vindas', () => {
    // Verifica se o clique no ícone de fechar oculta o alerta
    cy.get('.fechar-alerta').click();
    cy.get('.alerta').should('not.be.visible');
  });

  it('Deve exibir o botão "FAZER ORÇAMENTO"', () => {
    // Verifica se o botão de orçamento está visível na página
    cy.get('#orcamento').should('be.visible');
  });

  it('Deve redirecionar para a página de orçamento ao clicar no botão "FAZER ORÇAMENTO"', () => {
    // Verifica se o botão de orçamento redireciona corretamente
    cy.get('#orcamento').click();
    cy.url().should('include', '/orcamento.html');
  });

  it('Deve exibir as informações sobre os serviços oferecidos', () => {
    // Verifica se as seções de serviços estão visíveis na página
    cy.get('#servicos').should('be.visible');
    cy.get('.column').should('have.length', 3);
    cy.get('.column').first().should('contain.text', 'TESTES HUMANOS');
    cy.get('.column').eq(1).should('contain.text', 'TESTES DE MULTIDÃO');
    cy.get('.column').last().should('contain.text', 'TESTES ASSISTIDOS POR IA');
  });
});