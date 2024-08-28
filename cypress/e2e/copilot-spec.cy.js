describe('Testes de Login - Rent A Tester', () => {
    beforeEach(() => {
      cy.visit('https://rentatester.netlify.app');
    });
  
    it('Deve exibir mensagem de erro ao tentar logar sem preencher a senha', () => {
      cy.get('#login').type('teste');
      cy.get('#form-login').submit();
      cy.get('#mensagemErro').should('contain', 'É preciso informar a senha');
    });
  
    it('Deve exibir mensagem de erro ao tentar logar sem preencher o usuário', () => {
      cy.get('#senha').type('tcc');
      cy.get('#form-login').submit();
      cy.get('#mensagemErro').should('contain', 'É preciso informar o usuário');
    });
  
    it('Deve exibir mensagem de erro ao tentar logar sem preencher usuário e senha', () => {
      cy.get('#form-login').submit();
      cy.get('#mensagemErro').should('contain', 'É preciso informar o usuário e a senha');
    });
  
    it('Deve exibir mensagem de erro ao informar usuário ou senha incorretos', () => {
      cy.get('#login').type('usuario_incorreto');
      cy.get('#senha').type('senha_errada');
      cy.get('#form-login').submit();
      cy.get('#mensagemErro').should('contain', 'Usuário ou senha incorretos. Por favor, verifique suas credenciais!');
    });
  
    it('Deve redirecionar para a página home.html ao logar corretamente', () => {
      cy.get('#login').type('teste');
      cy.get('#senha').type('tcc');
      cy.get('#form-login').submit();
      cy.url().should('include', 'home.html');
    });
  
    it('Deve permitir acesso à página de criação de conta ao clicar em "Criar conta"', () => {
      cy.get('#criarConta a').click();
      cy.url().should('include', 'cadastro.html');
    });
  });