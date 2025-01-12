describe('Login de Usuário', () => {
    const url = 'https://rentatester.netlify.app';

    beforeEach(() => {
        cy.visit(url);
    });

    it('Deve realizar o login com sucesso', () => {
        cy.get('#login').type('rent@tester.com');
        cy.get('#senha').type('123456');
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/home.html');
    });

    it('Deve exibir mensagem de erro para e-mail vazio', () => {
        cy.get('#senha').type('123456');
        cy.get('input[type="submit"]').click();
        cy.get('#mensagemErro').should('contain', 'É preciso informar o e-mail para fazer login!');
    });

    it('Deve exibir mensagem de erro para senha vazia', () => {
        cy.get('#login').type('rent@tester.com');
        cy.get('input[type="submit"]').click();
        cy.get('#mensagemErro').should('contain', 'É preciso informar a senha para fazer login!');
    });

    it('Deve exibir mensagem de erro para ambos os campos vazios', () => {
        cy.get('input[type="submit"]').click();
        cy.get('#mensagemErro').should('contain', 'É preciso informar o e-mail e a senha para fazer login!');
    });

    it('Deve exibir mensagem de erro para e-mail ou senha incorretos', () => {
        cy.get('#login').type('usuario@invalido.com');
        cy.get('#senha').type('senhaErrada');
        cy.get('input[type="submit"]').click();
        cy.get('#mensagemErro').should('contain', 'E-mail ou senha incorretos. Por favor, verifique suas credenciais!');
    });

    it('Deve exibir mensagem de erro para e-mail inválido', () => {
        cy.get('#login').type('usuario@invalido');
        cy.get('#senha').type('123456');
        cy.get('input[type="submit"]').click();
        cy.get('#mensagemErro').should('contain', 'E-mail ou senha incorretos. Por favor, verifique suas credenciais!');
    });
});
