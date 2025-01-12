describe('Login de Usuário', () => {
  beforeEach(() => {
    cy.visit('https://rentatester.netlify.app');
  });

  it('Deve logar um usuário com sucesso', () => {
    cy.get('#login').type('rent@tester.com');
    cy.get('#senha').type('123456');
    cy.get('input[type="submit"]').click();

    // Assumindo que a página home contém um elemento com o texto "Bem-vindo, Tester"
    cy.contains('Bem-vindo, Tester').should('be.visible');
  });

  it('Não deve permitir login com email inválido', () => {
    cy.get('#login').type('emailinvalido');
    cy.get('#senha').type('123456');
    cy.get('input[type="submit"]').click();

    cy.get('#mensagemErro').should('contain.text', 'E-mail ou senha incorretos.');
  });

  it('Não deve permitir login com senha inválida', () => {
    cy.get('#login').type('rent@tester.com');
    cy.get('#senha').type('senhaerrada');
    cy.get('input[type="submit"]').click();

    cy.get('#mensagemErro').should('contain.text', 'E-mail ou senha incorretos.');
  });

  it('Não deve permitir login com campos vazios', () => {
    cy.get('input[type="submit"]').click();

    cy.get('#mensagemErro').should('contain.text', 'É preciso informar o e-mail e a senha para fazer login!');
  });

  it('Deve exibir mensagem de erro específica para email vazio', () => {
    cy.get('#senha').type('123456');
    cy.get('input[type="submit"]').click();

    cy.get('#mensagemErro').should('contain.text', 'É preciso informar o e-mail para fazer login!');
  });

  it('Deve exibir mensagem de erro específica para senha vazia', () => {
    cy.get('#login').type('rent@tester.com');
    cy.get('input[type="submit"]').click();

    cy.get('#mensagemErro').should('contain.text', 'É preciso informar a senha para fazer login!');
  });
});