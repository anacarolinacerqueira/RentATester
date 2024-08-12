describe('Testes de Login', () => {
  beforeEach(() => {
    cy.visit('https://rentatester-sut.netlify.app/login');
  });

  it('Deve exibir mensagem de erro ao tentar logar sem preencher login e senha', () => {
    cy.get('[data-cy=form-login]').submit();
    cy.get('form[data-cy=form-login] p').should('contain', 'É preciso informar o login e a senha');
  });

  it('Deve exibir mensagem de erro ao tentar logar sem preencher o login', () => {
    cy.get('[data-cy=password]').type('tcc');
    cy.wait(1000)
    cy.get('[data-cy=sign-in]').click();
    cy.get('form[data-cy=form-login] p').should('contain', 'É preciso informar o login');
  });

  it('Deve exibir mensagem de erro ao tentar logar sem preencher a senha', () => {
    cy.get('[data-cy=login]').type('teste');
    cy.get('[data-cy=sign-in]').click();
    cy.get('form[data-cy=form-login] p').should('contain', 'É preciso informar a senha');
  });

  it('Deve exibir mensagem de erro ao informar login ou senha incorretos', () => {
    cy.get('[data-cy=login]').type('usuario_inexistente');
    cy.get('[data-cy=password]').type('senha_errada');
    cy.get('[data-cy=sign-in]').click();
    cy.get('form[data-cy=form-login] p').should('contain', 'Login ou senha incorretos');
  });

});
