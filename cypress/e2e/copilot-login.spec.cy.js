describe('Testes de Login', () => {
    const url = 'https://rentatester.netlify.app/';
    const validEmail = 'maria.silva@mail.com';
    const validPassword = 'senha123';
  
    beforeEach(() => {
      cy.visit(url);
    });
  
    it('Deve carregar a página de login corretamente', () => {
      cy.get('input[name="login"]').should('be.visible');
      cy.get('input[name="senha"]').should('be.visible');
      cy.get('input[type="submit"]').should('be.visible');
    });
  
    it('Deve exibir mensagem de erro quando os campos estão vazios', () => {
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro').should('contain', 'É preciso informar o e-mail e a senha para fazer login!');
    });
  
    it('Deve exibir mensagem de erro quando o e-mail está vazio', () => {
      cy.get('input[name="senha"]').type(validPassword);
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro').should('contain', 'É preciso informar o e-mail para fazer login!');
    });
  
    it('Deve exibir mensagem de erro quando a senha está vazia', () => {
      cy.get('input[name="login"]').type(validEmail);
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro').should('contain', 'É preciso informar a senha para fazer login!');
    });
  
    it('Deve exibir mensagem de erro quando o e-mail ou senha estão incorretos', () => {
      cy.get('input[name="login"]').type('email@invalido.com');
      cy.get('input[name="senha"]').type('senhaerrada');
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro').should('contain', 'E-mail ou senha incorretos. Por favor, verifique suas credenciais!');
    });
  
    it('Deve fazer login com sucesso com credenciais válidas', () => {
      cy.get('input[name="login"]').type(validEmail);
      cy.get('input[name="senha"]').type(validPassword);
      cy.get('input[type="submit"]').click();
      cy.url().should('include', '/home.html');
    });
  });  