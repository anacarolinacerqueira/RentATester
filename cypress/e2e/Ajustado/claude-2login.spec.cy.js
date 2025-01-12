describe('Página de Login', () => {
  beforeEach(() => {
    cy.visit('https://rentatester.netlify.app');
    cy.clearLocalStorage();
  });

  describe('Validações de Campos Obrigatórios', () => {
    it('deve exibir mensagem quando email e senha estão vazios', () => {
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro')
        .should('have.text', 'É preciso informar o e-mail e a senha para fazer login!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'font-size', '12px')
        .and('have.css', 'text-align', 'center');
    });

    it('deve exibir mensagem quando apenas email está vazio', () => {
      cy.get('#senha').type('qualquersenha');
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro').should('have.text', 'É preciso informar o e-mail para fazer login!');
    });

    it('deve exibir mensagem quando apenas senha está vazia', () => {
      cy.get('#login').type('qualquer@email.com');
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro').should('have.text', 'É preciso informar a senha para fazer login!');
    });
  });

  describe('Validações de Credenciais', () => {
    it('deve exibir mensagem para credenciais inválidas', () => {
      cy.get('#login').type('email@invalido.com');
      cy.get('#senha').type('senhainvalida');
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro').should('have.text', 'E-mail ou senha incorretos. Por favor, verifique suas credenciais!');
    });

    it('deve fazer login com credenciais fixas válidas', () => {
      cy.get('#login').type('rent@tester.com');
      cy.get('#senha').type('123456');
      cy.get('input[type="submit"]').click();
      cy.url().should('include', '/home.html');
    });

    it('deve fazer login com usuário cadastrado', () => {
      const user = {
        nome: 'Usuario Teste',
        email: 'usuario@teste.com',
        senha: '123456'
      };
      
      window.localStorage.setItem('users', JSON.stringify([user]));
      
      cy.get('#login').type(user.email);
      cy.get('#senha').type(user.senha);
      cy.get('input[type="submit"]').click();
      
      cy.getAllLocalStorage().then((localStorage) => {
        const currentUser = JSON.parse(localStorage['https://rentatester.netlify.app']['currentUser']);
        expect(currentUser).to.deep.equal(user);
      });
      
      cy.url().should('include', '/home.html');
    });
  });

  describe('Validações de Interface', () => {
    it('deve exibir placeholders nos campos', () => {
      cy.get('#login').should('have.attr', 'placeholder', 'informe seu e-mail');
      cy.get('#senha').should('have.attr', 'placeholder', 'informe sua senha');
    });

    it('deve remover espaços em branco dos inputs', () => {
      cy.get('#login').type('  rent@tester.com  ');
      cy.get('#senha').type('  123456  ');
      cy.get('input[type="submit"]').click();
      cy.url().should('include', '/home.html');
    });

    it('deve permitir navegação para página de cadastro', () => {
      cy.get('#criarConta a').click();
      cy.url().should('include', '/cadastro');
    });
  });

  describe('Validações de Dados', () => {
    it('deve manter dados do usuário após login bem-sucedido', () => {
      const users = [{
        nome: 'Usuario 1',
        email: 'usuario1@teste.com',
        senha: '123456'
      }, {
        nome: 'Usuario 2',
        email: 'usuario2@teste.com',
        senha: '654321'
      }];

      window.localStorage.setItem('users', JSON.stringify(users));
      
      cy.get('#login').type(users[1].email);
      cy.get('#senha').type(users[1].senha);
      cy.get('input[type="submit"]').click();
      
      cy.getAllLocalStorage().then((localStorage) => {
        const currentUser = JSON.parse(localStorage['https://rentatester.netlify.app']['currentUser']);
        expect(currentUser).to.deep.equal(users[1]);
      });
    });

    it('deve manter lista de usuários após tentativas de login', () => {
      const users = [{
        nome: 'Usuario Teste',
        email: 'usuario@teste.com',
        senha: '123456'
      }];

      window.localStorage.setItem('users', JSON.stringify(users));
      
      // Tentativa com credenciais inválidas
      cy.get('#login').type('invalido@email.com');
      cy.get('#senha').type('senhainvalida');
      cy.get('input[type="submit"]').click();
      
      cy.getAllLocalStorage().then((localStorage) => {
        const storedUsers = JSON.parse(localStorage['https://rentatester.netlify.app']['users']);
        expect(storedUsers).to.deep.equal(users);
      });
    });
  });

  describe('Comportamento do Formulário', () => {
    it('deve prevenir submissão padrão do formulário', () => {
      cy.get('#form-login').then($form => {
        expect($form.attr('onsubmit')).to.equal('return false');
      });
    });

    it('deve limpar mensagem de erro após nova tentativa', () => {
      // Primeira tentativa - gera erro
      cy.get('input[type="submit"]').click();
      cy.get('#mensagemErro').should('not.be.empty');

      // Segunda tentativa - credenciais válidas
      cy.get('#login').type('rent@tester.com');
      cy.get('#senha').type('123456');
      cy.get('input[type="submit"]').click();
      
      cy.get('#mensagemErro').should('be.empty');
    });
  });
});