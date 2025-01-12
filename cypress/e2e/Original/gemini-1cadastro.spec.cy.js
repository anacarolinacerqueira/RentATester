describe('Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit('https://rentatester.netlify.app/cadastro');
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.get('#nome').type('João da Silva');
    cy.get('#email').type('joao@example.com');
    cy.get('#estado').select('SP');
    cy.get('#cidade').type('São Paulo');
    cy.get('#senha').type('123456');
    cy.get('#repitaSenha').type('123456');
    cy.get('#botaoCadastrar').click();

    cy.contains('Cadastro realizado com sucesso!').should('be.visible');
  });

  it('Não deve permitir cadastrar um usuário com nome vazio', () => {
    cy.get('#nome').clear();
    cy.get('#email').type('joao@example.com');
    // ... preencher os demais campos ...
    cy.get('#botaoCadastrar').click();

    cy.get('#nomeError').should('contain.text', 'É necessário informar um nome válido!');
  });

  it('Não deve permitir cadastrar um usuário com email inválido', () => {
    cy.get('#email').type('emailinvalido');
    // ... preencher os demais campos ...
    cy.get('#botaoCadastrar').click();

    cy.get('#emailError').should('contain.text', 'É necessário informar um e-mail válido!');
  });

  it('Não deve permitir cadastrar um usuário com senha menor que 6 caracteres', () => {
    cy.get('#senha').type('123');
    cy.get('#repitaSenha').type('123');
    // ... preencher os demais campos ...
    cy.get('#botaoCadastrar').click();

    cy.get('#senhaError').should('contain.text', 'A senha precisa ter no mínimo 6 caracteres!');
  });

  it('Não deve permitir cadastrar um usuário com senhas diferentes', () => {
    cy.get('#senha').type('123456');
    cy.get('#repitaSenha').type('654321');
    // ... preencher os demais campos ...
    cy.get('#botaoCadastrar').click();

    cy.get('#repitaSenhaError').should('contain.text', 'As senhas não coincidem!');
  });

  it('Deve limpar os campos e mensagens de erro após um novo cadastro', () => {
    // ... realizar um cadastro válido
    cy.get('#nome').clear();
    cy.get('#email').clear();
    // ... limpar os demais campos ...
    cy.get('#botaoCadastrar').click();

    // Verificar se os campos estão vazios e se as mensagens de erro não estão mais visíveis
  });

  // ... outros casos de teste, como:
  // - Testar com caracteres especiais no nome
  // - Testar com emails com diferentes domínios
  // - Testar com diferentes estados e cidades
  // - Testar o armazenamento dos dados no localStorage
  // - Testar o redirecionamento após o cadastro
});