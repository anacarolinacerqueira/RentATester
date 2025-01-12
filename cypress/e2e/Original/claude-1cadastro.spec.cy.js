describe('Página de Cadastro', () => {
  beforeEach(() => {
    cy.visit('https://rentatester.netlify.app/cadastro');
    cy.clearLocalStorage();
  });

  describe('Validações do Campo Email', () => {
    it('deve exibir erro quando email não é informado', () => {
      cy.get('#botaoCadastrar').click();
      cy.get('#emailError')
        .should('have.text', 'É necessário informar um e-mail válido!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'font-weight', '700');
    });

    it('deve exibir erro quando email é inválido', () => {
      cy.get('#email').type('emailinvalido');
      cy.get('#botaoCadastrar').click();
      cy.get('#emailError').should('have.text', 'É necessário informar um e-mail válido!');
    });

    it('deve aceitar email em formato válido', () => {
      cy.get('#email').type('teste@teste.com');
      cy.get('#botaoCadastrar').click();
      cy.get('#emailError').should('be.empty');
    });
  });

  describe('Validações do Campo Estado', () => {
    it('deve exibir erro quando estado não é selecionado', () => {
      cy.get('#botaoCadastrar').click();
      cy.get('#estadoError').should('have.text', 'Selecione um estado válido!');
    });

    it('deve aceitar seleção de estado válido', () => {
      cy.get('#estado').select('SP');
      cy.get('#botaoCadastrar').click();
      cy.get('#estadoError').should('be.empty');
    });
  });

  describe('Validações do Campo Senha', () => {
    it('deve exibir erro quando senha não é informada', () => {
      cy.get('#botaoCadastrar').click();
      cy.get('#senhaError').should('have.text', 'A senha precisa ter no mínimo 6 caracteres!');
    });

    it('deve exibir erro quando senha tem menos de 6 caracteres', () => {
      cy.get('#senha').type('12345');
      cy.get('#botaoCadastrar').click();
      cy.get('#senhaError').should('have.text', 'A senha precisa ter no mínimo 6 caracteres!');
    });

    it('deve aceitar senha com 6 ou mais caracteres', () => {
      cy.get('#senha').type('123456');
      cy.get('#botaoCadastrar').click();
      cy.get('#senhaError').should('be.empty');
    });
  });

  describe('Validações da Confirmação de Senha', () => {
    it('deve exibir erro quando confirmação de senha não é informada', () => {
      cy.get('#senha').type('123456');
      cy.get('#botaoCadastrar').click();
      cy.get('#repitaSenhaError').should('have.text', 'Você precisa repetir a senha!');
    });

    it('deve exibir erro quando senhas não coincidem', () => {
      cy.get('#senha').type('123456');
      cy.get('#repitaSenha').type('654321');
      cy.get('#botaoCadastrar').click();
      cy.get('#repitaSenhaError').should('have.text', 'As senhas não coincidem!');
    });

    it('deve aceitar quando senhas coincidem', () => {
      cy.get('#senha').type('123456');
      cy.get('#repitaSenha').type('123456');
      cy.get('#botaoCadastrar').click();
      cy.get('#repitaSenhaError').should('be.empty');
    });
  });

  describe('Cadastro Completo', () => {
    it('deve limpar mensagens de erro ao resubmeter formulário', () => {
      cy.get('#botaoCadastrar').click();
      cy.get('.error-message').should('not.be.empty');
      
      cy.get('#nome').type('Teste');
      cy.get('#email').type('teste@teste.com');
      cy.get('#estado').select('SP');
      cy.get('#cidade').type('São Paulo');
      cy.get('#senha').type('123456');
      cy.get('#repitaSenha').type('123456');
      cy.get('#botaoCadastrar').click();
      
      cy.get('.error-message').each(($el) => {
        cy.wrap($el).should('be.empty');
      });
    });

    it('deve realizar cadastro com sucesso e redirecionar', () => {
      cy.clock();
      
      cy.get('#nome').type('Usuário Teste');
      cy.get('#email').type('teste@teste.com');
      cy.get('#estado').select('SP');
      cy.get('#cidade').type('São Paulo');
      cy.get('#senha').type('123456');
      cy.get('#repitaSenha').type('123456');
      cy.get('#botaoCadastrar').click();

      cy.get('#successMessage')
        .should('have.text', 'Cadastro realizado com sucesso!');

      cy.getAllLocalStorage().then((localStorage) => {
        const users = JSON.parse(localStorage['https://rentatester.netlify.app']['users']);
        expect(users).to.have.length(1);
        expect(users[0]).to.deep.include({
          nome: 'Usuário Teste',
          email: 'teste@teste.com',
          senha: '123456'
        });
      });

      cy.tick(5000);
      cy.url().should('include', '/index.html');
    });

    it('deve armazenar múltiplos usuários no localStorage', () => {
      // Primeiro usuário
      cy.get('#nome').type('Usuário 1');
      cy.get('#email').type('usuario1@teste.com');
      cy.get('#estado').select('SP');
      cy.get('#cidade').type('São Paulo');
      cy.get('#senha').type('123456');
      cy.get('#repitaSenha').type('123456');
      cy.get('#botaoCadastrar').click();

      cy.visit('https://rentatester.netlify.app/cadastro');

      // Segundo usuário
      cy.get('#nome').type('Usuário 2');
      cy.get('#email').type('usuario2@teste.com');
      cy.get('#estado').select('RJ');
      cy.get('#cidade').type('Rio de Janeiro');
      cy.get('#senha').type('654321');
      cy.get('#repitaSenha').type('654321');
      cy.get('#botaoCadastrar').click();

      cy.getAllLocalStorage().then((localStorage) => {
        const users = JSON.parse(localStorage['https://rentatester.netlify.app']['users']);
        expect(users).to.have.length(2);
        expect(users[1].email).to.equal('usuario2@teste.com');
      });
    });
  });

  describe('Validações de Interface', () => {
    it('deve exibir mensagens de erro com estilo correto', () => {
      cy.get('#botaoCadastrar').click();
      cy.get('.error-message').filter(':not(:empty)').each(($el) => {
        cy.wrap($el)
          .should('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'font-weight', '700')
          .and('have.css', 'font-size', '12px');
      });
    });

    it('deve manter placeholder da senha visível', () => {
      cy.get('#senha')
        .should('have.attr', 'placeholder', 'Informe uma senha com no mínino 6 caracteres');
    });

    it('deve permitir navegação pelo logo', () => {
      cy.get('#logo-orcamento').click();
      cy.url().should('include', '/index.html');
    });
  });
});