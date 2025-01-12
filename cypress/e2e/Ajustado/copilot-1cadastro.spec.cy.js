describe('Cadastro de Usuário', () => {
    const url = 'https://rentatester.netlify.app/cadastro';

    beforeEach(() => {
        cy.visit(url);
    });

    it('Deve realizar o cadastro com sucesso', () => {
        cy.get('#nome').type('João Silva');
        cy.get('#email').type('joao@example.com');
        cy.get('#estado').select('BA');
        cy.get('#cidade').type('Salvador');
        cy.get('#senha').type('senhaSegura123');
        cy.get('#repitaSenha').type('senhaSegura123');
        cy.get('#botaoCadastrar').click();
        cy.get('#successMessage').should('contain', 'Cadastro realizado com sucesso!');
    });

    it('Deve exibir mensagem de erro para e-mail inválido', () => {
        cy.get('#nome').type('João Silva');
        cy.get('#email').type('joao@invalido');
        cy.get('#estado').select('BA');
        cy.get('#cidade').type('Salvador');
        cy.get('#senha').type('senhaSegura123');
        cy.get('#repitaSenha').type('senhaSegura123');
        cy.get('#botaoCadastrar').click();
        cy.get('#emailError').should('contain', 'É necessário informar um e-mail válido!');
    });

    it('Deve exibir mensagem de erro para e-mail vazio', () => {
        cy.get('#nome').type('João Silva');
        cy.get('#estado').select('BA');
        cy.get('#cidade').type('Salvador');
        cy.get('#senha').type('senhaSegura123');
        cy.get('#repitaSenha').type('senhaSegura123');
        cy.get('#botaoCadastrar').click();
        cy.get('#emailError').should('contain', 'É necessário informar um e-mail válido!');
    });

    it('Deve exibir mensagem de erro para estado não selecionado', () => {
        cy.get('#nome').type('João Silva');
        cy.get('#email').type('joao@example.com');
        cy.get('#cidade').type('Salvador');
        cy.get('#senha').type('senhaSegura123');
        cy.get('#repitaSenha').type('senhaSegura123');
        cy.get('#botaoCadastrar').click();
        cy.get('#estadoError').should('contain', 'Selecione um estado válido!');
    });

    it('Deve exibir mensagem de erro para senha curta', () => {
        cy.get('#nome').type('João Silva');
        cy.get('#email').type('joao@example.com');
        cy.get('#estado').select('BA');
        cy.get('#cidade').type('Salvador');
        cy.get('#senha').type('123');
        cy.get('#repitaSenha').type('123');
        cy.get('#botaoCadastrar').click();
        cy.get('#senhaError').should('contain', 'A senha precisa ter no mínimo 6 caracteres!');
    });

    it('Deve exibir mensagem de erro para repetição de senha vazia', () => {
        cy.get('#nome').type('João Silva');
        cy.get('#email').type('joao@example.com');
        cy.get('#estado').select('BA');
        cy.get('#cidade').type('Salvador');
        cy.get('#senha').type('senhaSegura123');
        cy.get('#botaoCadastrar').click();
        cy.get('#repitaSenhaError').should('contain', 'Você precisa repetir a senha!');
    });

    it('Deve exibir mensagem de erro para senhas que não coincidem', () => {
        cy.get('#nome').type('João Silva');
        cy.get('#email').type('joao@example.com');
        cy.get('#estado').select('BA');
        cy.get('#cidade').type('Salvador');
        cy.get('#senha').type('senhaSegura123');
        cy.get('#repitaSenha').type('senhaErrada123');
        cy.get('#botaoCadastrar').click();
        cy.get('#repitaSenhaError').should('contain', 'As senhas não coincidem!');
    });
});