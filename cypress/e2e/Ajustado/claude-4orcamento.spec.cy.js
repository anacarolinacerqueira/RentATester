describe('Budget Request Functionality - RentATester', () => {
  const validEmail = 'rent@tester.com';
  const validPassword = '123456';
 
  beforeEach(() => {
    // Login e navegação para página de orçamento
    cy.visit('https://rentatester.netlify.app');
    cy.get('#login').type(validEmail);
    cy.get('#senha').type(validPassword);
    cy.get('input[type="submit"]').click();
    cy.get('#orcamento').click();
    cy.url().should('include', '/orcamento.html');
  });
 
  // Testes de seleção de plataforma
  describe('Platform Selection', () => {
    it('Deve validar seleção de plataforma Web', () => {
      cy.get('#web').check();
      cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Web');
    });
 
    it('Deve validar seleção de plataforma Mobile', () => {
      cy.get('#mobile').check();
      cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Mobile');
    });
 
    it('Deve validar seleção de plataforma Desktop', () => {
      cy.get('#desktop').check();
      cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Desktop');
    });
  });
 
  // Testes de seleção de tipo de teste
  describe('Test Type Selection', () => {
    it('Deve validar seleção de Testes Humanos', () => {
      cy.get('#humanos').check();
      cy.get('#msg-tipoteste').should('contain', 'Testes Humanos');
    });
 
    it('Deve validar seleção de Testes de Multidão', () => {
      cy.get('#multidao').check();
      cy.get('#msg-tipoteste').should('contain', 'Testes de Multidão');
    });
 
    it('Deve validar seleção de Testes Assistidos por IA', () => {
      cy.get('#ia').check();
      cy.get('#msg-tipoteste').should('contain', 'Testes Assistidos por IA');
    });
 
    it('Deve exibir alerta para Serviço Personalizado', () => {
      cy.get('#personalizado').check();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Para um serviço personalizado, entre em contato pelo nosso telefone: 4002-8922.');
      });
    });
  });
 
  // Testes de validação de escopo
  describe('Project Scope Validation', () => {
    beforeEach(() => {
      cy.get('#web').check();
      cy.get('#humanos').check();
    });
 
    it('Deve rejeitar tempo de projeto menor que 5 dias', () => {
      cy.get('#tempo-projeto').type('4');
      cy.get('#quantidade-testers').type('5');
      cy.get('#horas-dia').type('8');
      cy.get('#seta-continuar').click();
      cy.get('#validacoes-escopo').should('contain', 'tempo mínimo para um projeto de testes é 5 dias');
    });
 
    it('Deve rejeitar quantidade de testadores inválida', () => {
      cy.get('#tempo-projeto').type('10');
      cy.get('#quantidade-testers').type('0');
      cy.get('#horas-dia').type('8');
      cy.get('#seta-continuar').click();
      cy.get('#validacoes-escopo').should('contain', 'necessário selecionar entre 1 e 50 testadores');
    });
 
    it('Deve rejeitar horas de trabalho inválidas', () => {
      cy.get('#tempo-projeto').type('10');
      cy.get('#quantidade-testers').type('5');
      cy.get('#horas-dia').type('11');
      cy.get('#seta-continuar').click();
      cy.get('#validacoes-escopo').should('contain', 'máximo de tempo de trabalho por dia é 10 horas');
    });
  });
 
  // Teste de cálculo de orçamento
  describe('Budget Calculation', () => {
    it('Deve calcular orçamento corretamente', () => {
      cy.get('#web').check();
      cy.get('#humanos').check();
      cy.get('#tempo-projeto').type('10');
      cy.get('#quantidade-testers').type('5');
      cy.get('#horas-dia').type('8');
      cy.get('#seta-continuar').click();
      
      cy.get('#resultado')
        .should('be.visible')
        .and('contain', 'R$');
    });
 
    it('Deve permitir novo orçamento após cálculo', () => {
      cy.get('#web').check();
      cy.get('#humanos').check();
      cy.get('#tempo-projeto').type('10');
      cy.get('#quantidade-testers').type('5');
      cy.get('#horas-dia').type('8');
      cy.get('#seta-continuar').click();
      
      cy.get('#novo-orcamento').should('contain', 'Fazer um novo Orçamento');
    });
  });
 });