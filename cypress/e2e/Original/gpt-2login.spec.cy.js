describe('Teste de Login', () => {
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://rentatester.netlify.app');
  });

  it('Deve conseguir fazer login com credenciais válidas', () => {
    // Preenche o campo de e-mail
    cy.get('#login').type('rent@tester.com');
    // Preenche o campo de senha
    cy.get('#senha').type('123456');
    // Clica no botão de login
    cy.get('input[type="submit"]').click();
    // Verifica se o redirecionamento ocorreu para a página correta (home.html)
    cy.url().should('include', 'home.html');
    // Verifica se o login foi realizado, confirmando a presença do nome do usuário
    cy.contains('Tester').should('be.visible');
  });

  it('Deve mostrar mensagem de erro ao tentar fazer login com e-mail incorreto', () => {
    // Preenche o campo de e-mail com um valor incorreto
    cy.get('#login').type('incorrectemail@tester.com');
    // Preenche o campo de senha com a senha correta
    cy.get('#senha').type('123456');
    // Clica no botão de login
    cy.get('input[type="submit"]').click();
    // Verifica se a mensagem de erro é exibida
    cy.get('#mensagemErro').should('have.text', 'E-mail ou senha incorretos. Por favor, verifique suas credenciais!');
  });

  it('Deve mostrar mensagem de erro ao tentar fazer login com senha incorreta', () => {
    // Preenche o campo de e-mail com o valor correto
    cy.get('#login').type('rent@tester.com');
    // Preenche o campo de senha com um valor incorreto
    cy.get('#senha').type('wrongpassword');
    // Clica no botão de login
    cy.get('input[type="submit"]').click();
    // Verifica se a mensagem de erro é exibida
    cy.get('#mensagemErro').should('have.text', 'E-mail ou senha incorretos. Por favor, verifique suas credenciais!');
  });

  it('Deve mostrar mensagem de erro quando o e-mail estiver vazio', () => {
    // Deixa o campo de e-mail vazio
    cy.get('#login').clear();
    // Preenche o campo de senha com a senha correta
    cy.get('#senha').type('123456');
    // Clica no botão de login
    cy.get('input[type="submit"]').click();
    // Verifica se a mensagem de erro é exibida
    cy.get('#mensagemErro').should('have.text', 'É preciso informar o e-mail para fazer login!');
  });

  it('Deve mostrar mensagem de erro quando a senha estiver vazia', () => {
    // Preenche o campo de e-mail com o valor correto
    cy.get('#login').type('rent@tester.com');
    // Deixa o campo de senha vazio
    cy.get('#senha').clear();
    // Clica no botão de login
    cy.get('input[type="submit"]').click();
    // Verifica se a mensagem de erro é exibida
    cy.get('#mensagemErro').should('have.text', 'É preciso informar a senha para fazer login!');
  });

  it('Deve mostrar mensagem de erro quando ambos os campos estiverem vazios', () => {
    // Deixa ambos os campos vazios
    cy.get('#login').clear();
    cy.get('#senha').clear();
    // Clica no botão de login
    cy.get('input[type="submit"]').click();
    // Verifica se a mensagem de erro é exibida
    cy.get('#mensagemErro').should('have.text', 'É preciso informar o e-mail e a senha para fazer login!');
  });

  it('Deve permitir navegação para a página de cadastro', () => {
    // Clica no link de "Criar conta"
    cy.get('#criarConta a').click();
    // Verifica se a URL contém a página de cadastro
    cy.url().should('include', 'cadastro.html');
  });
});