describe('Testes de Cadastro - Rent A Tester', () => {
    beforeEach(() => {
      cy.visit('https://rentatester.netlify.app/');
      cy.contains('Criar conta').click();
    });
  
    it('Deve carregar a página de cadastro', () => {
      cy.url().should('include', '/cadastro');
      cy.get('h2').should('contain', 'CADASTRE-SE!');
    });
  
    it('Deve exibir mensagem de erro para nome inválido', () => {
      cy.get('#nome').type('Ana');
      cy.get('#botaoCadastrar').click();
      cy.get('#nomeError').should('contain', 'É necessário informar um nome válido!');
    });
  
    it('Deve exibir mensagem de erro para e-mail inválido', () => {
      cy.get('#email').type('emailinvalido');
      cy.get('#botaoCadastrar').click();
      cy.get('#emailError').should('contain', 'É necessário informar o e-mail!');
    });
  
    it('Deve exibir mensagem de erro para estado não selecionado', () => {
      cy.get('#botaoCadastrar').click();
      cy.get('#estadoError').should('contain', 'Selecione um estado válido!');
    });
  
    it('Deve exibir mensagem de erro para senha curta', () => {
      cy.get('#senha').type('123');
      cy.get('#botaoCadastrar').click();
      cy.get('#senhaError').should('contain', 'A senha precisa ter no mínimo 6 caracteres!');
    });
  
    it('Deve exibir mensagem de erro para senhas não coincidentes', () => {
      cy.get('#senha').type('senha123');
      cy.get('#repitaSenha').type('senha456');
      cy.get('#botaoCadastrar').click();
      cy.get('#repitaSenhaError').should('contain', 'As senhas não coincidem!');
    });
  
    it('Deve realizar cadastro com sucesso', () => {
      cy.get('#nome').type('Maria Silva');
      cy.get('#email').type('maria.silva@mail.com');
      cy.get('#estado').select('BA');
      cy.get('#cidade').type('Salvador');
      cy.get('#senha').type('senha123');
      cy.get('#repitaSenha').type('senha123');
      cy.get('#botaoCadastrar').click();
      cy.get('#successMessage').should('contain', 'Cadastro realizado com sucesso!');
    });
  });
  