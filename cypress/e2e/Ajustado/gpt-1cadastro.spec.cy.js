describe('Cadastro de Usuário - Rent A Tester', () => {
  
  beforeEach(() => {
    cy.visit('https://rentatester.netlify.app/cadastro');
  });

  // Teste 1: Preenchimento de todos os campos obrigatórios e cadastro com sucesso
  it('Deve realizar o cadastro com sucesso quando todos os campos forem preenchidos corretamente', () => {
    // Preenche os campos obrigatórios
    cy.get('#nome').type('João Silva');
    cy.get('#email').type('joao.silva@example.com');
    cy.get('#estado').select('SP');
    cy.get('#cidade').type('São Paulo');
    cy.get('#senha').type('senha123');
    cy.get('#repitaSenha').type('senha123');
    
    // Submete o formulário
    cy.get('#cadastroForm').submit();

    // Verifica a mensagem de sucesso
    cy.get('#successMessage').should('contain', 'Cadastro realizado com sucesso!');
    
    // Espera o redirecionamento para a página inicial após 5 segundos
    cy.wait(5000);
    cy.url().should('eq', 'https://rentatester.netlify.app/index.html');
  });

  // Teste 2: Validação de E-mail inválido
  it('Deve mostrar erro se o e-mail informado for inválido', () => {
    cy.get('#nome').type('Ana Souza');
    cy.get('#email').type('ana.souza@example');
    cy.get('#estado').select('RJ');
    cy.get('#cidade').type('Rio de Janeiro');
    cy.get('#senha').type('senha123');
    cy.get('#repitaSenha').type('senha123');

    cy.get('#cadastroForm').submit();

    // Verifica a mensagem de erro para o campo e-mail
    cy.get('#emailError').should('contain', 'É necessário informar um e-mail válido!');
  });

  // Teste 3: Validação de campo de estado vazio
  it('Deve mostrar erro se o estado não for selecionado', () => {
    cy.get('#nome').type('Carlos Lima');
    cy.get('#email').type('carlos.lima@example.com');
    cy.get('#estado').select('');
    cy.get('#cidade').type('Curitiba');
    cy.get('#senha').type('senha123');
    cy.get('#repitaSenha').type('senha123');

    cy.get('#cadastroForm').submit();

    // Verifica a mensagem de erro para o campo estado
    cy.get('#estadoError').should('contain', 'Selecione um estado válido!');
  });

  // Teste 4: Validação de senha com menos de 6 caracteres
  it('Deve mostrar erro se a senha tiver menos de 6 caracteres', () => {
    cy.get('#nome').type('Mariana Pereira');
    cy.get('#email').type('mariana.pereira@example.com');
    cy.get('#estado').select('MG');
    cy.get('#cidade').type('Belo Horizonte');
    cy.get('#senha').type('12345');
    cy.get('#repitaSenha').type('12345');

    cy.get('#cadastroForm').submit();

    // Verifica a mensagem de erro para o campo senha
    cy.get('#senhaError').should('contain', 'A senha precisa ter no mínimo 6 caracteres!');
  });

  // Teste 5: Validação de senha e repetição de senha diferentes
  it('Deve mostrar erro se as senhas não coincidirem', () => {
    cy.get('#nome').type('Lucas Rocha');
    cy.get('#email').type('lucas.rocha@example.com');
    cy.get('#estado').select('BA');
    cy.get('#cidade').type('Salvador');
    cy.get('#senha').type('senha123');
    cy.get('#repitaSenha').type('senha321');

    cy.get('#cadastroForm').submit();

    // Verifica a mensagem de erro para o campo repetição de senha
    cy.get('#repitaSenhaError').should('contain', 'As senhas não coincidem!');
  });

  // Teste 6: Validação de campo "Repita a Senha" vazio
  it('Deve mostrar erro se o campo "Repita a Senha" não for preenchido', () => {
    cy.get('#nome').type('Felipe Oliveira');
    cy.get('#email').type('felipe.oliveira@example.com');
    cy.get('#estado').select('RS');
    cy.get('#cidade').type('Porto Alegre');
    cy.get('#senha').type('senha123');
    cy.get('#repitaSenha').clear();

    cy.get('#cadastroForm').submit();

    // Verifica a mensagem de erro para o campo "Repita a Senha"
    cy.get('#repitaSenhaError').should('contain', 'Você precisa repetir a senha!');
  });

  // Teste 7: Validação de campos obrigatórios em branco
  it('Deve mostrar erro se campos obrigatórios forem deixados em branco', () => {
    cy.get('#nome').clear();
    cy.get('#email').clear();
    cy.get('#estado').select('');
    cy.get('#cidade').clear();
    cy.get('#senha').clear();
    cy.get('#repitaSenha').clear();

    cy.get('#cadastroForm').submit();

    // Verifica as mensagens de erro para cada campo
    cy.get('#nomeError').should('contain', 'É necessário informar um nome válido!');
    cy.get('#emailError').should('contain', 'É necessário informar um e-mail válido!');
    cy.get('#estadoError').should('contain', 'Selecione um estado válido!');
    cy.get('#senhaError').should('contain', 'A senha precisa ter no mínimo 6 caracteres!');
    cy.get('#repitaSenhaError').should('contain', 'Você precisa repetir a senha!');
  });

  // Teste 8: Cadastro com e-mail já registrado (simulando um usuário existente no localStorage)
  it('Não deve permitir cadastro com e-mail já registrado', () => {
    // Simula um usuário já cadastrado
    const existingUser = {
      nome: 'Maria Costa',
      email: 'maria.costa@example.com',
      senha: 'senha123',
    };
    
    const users = [existingUser];
    localStorage.setItem('users', JSON.stringify(users));

    // Tenta cadastrar um novo usuário com o mesmo e-mail
    cy.get('#nome').type('Maria Costa');
    cy.get('#email').type('maria.costa@example.com');
    cy.get('#estado').select('CE');
    cy.get('#cidade').type('Fortaleza');
    cy.get('#senha').type('senha123');
    cy.get('#repitaSenha').type('senha123');

    cy.get('#cadastroForm').submit();

    // Verifica se a mensagem de erro para e-mail duplicado é exibida
    cy.get('#emailError').should('contain', 'E-mail já cadastrado!');
  });

  // Teste 9: Mensagens de erro devem desaparecer após corrigir os campos inválidos
  it('As mensagens de erro devem desaparecer ao corrigir os campos inválidos', () => {
    cy.get('#nome').clear();
    cy.get('#email').clear();
    cy.get('#estado').select('');
    cy.get('#cidade').clear();
    cy.get('#senha').clear();
    cy.get('#repitaSenha').clear();
    
    cy.get('#cadastroForm').submit();

    // Verifica que as mensagens de erro estão visíveis
    cy.get('#nomeError').should('be.visible');
    cy.get('#emailError').should('be.visible');
    cy.get('#estadoError').should('be.visible');
    cy.get('#senhaError').should('be.visible');
    cy.get('#repitaSenhaError').should('be.visible');

    // Corrige os campos
    cy.get('#nome').type('Paula Lima');
    cy.get('#email').type('paula.lima@example.com');
    cy.get('#estado').select('PE');
    cy.get('#cidade').type('Recife');
    cy.get('#senha').type('senha123');
    cy.get('#repitaSenha').type('senha123');

    // Submete o formulário novamente
    cy.get('#cadastroForm').submit();

    // Verifica que as mensagens de erro desapareceram
    cy.get('#nomeError').should('not.exist');
    cy.get('#emailError').should('not.exist');
    cy.get('#estadoError').should('not.exist');
    cy.get('#cidadeError').should('not.exist');
    cy.get('#senhaError').should('not.exist');
    cy.get('#repitaSenhaError').should('not.exist');
  });

});