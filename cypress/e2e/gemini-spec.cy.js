describe('Login Page', () => {
    it('should display error message when all fields are empty', () => {
      cy.visit('https://rentatester.netlify.app');
      cy.get('button[type="submit"]').click();
      cy.get('#mensagemErro').should('contain', 'É preciso informar o usuário e a senha');
    });
  
    it('should display error message when username is empty', () => {
      cy.visit('https://rentatester.netlify.app');
      cy.get('#senha').type('tcc');
      cy.get('button[type="submit"]').click();
      cy.get('#mensagemErro').should('contain', 'É preciso informar o usuário');
    });
  
    it('should display error message when password is empty', () => {
      cy.visit('https://rentatester.netlify.app');
      cy.get('#login').type('teste');
      cy.get('button[type="submit"]').click();
      cy.get('#mensagemErro').should('contain', 'É preciso informar a senha');
    });
  
    it('should display error message for invalid credentials', () => {
      cy.visit('https://rentatester.netlify.app');
      cy.get('#login').type('invalid');
      cy.get('#senha').type('invalid');
      cy.get('button[type="submit"]').click();
      cy.get('#mensagemErro').should('contain', 'Usuário ou senha incorretos');
    });
  
    it('should redirect to home page for valid credentials', () => {
      cy.visit('https://rentatester.netlify.app');
      cy.get('#login').type('teste');
      cy.get('#senha').type('tcc');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', 'home.html');
    });
  });