describe('Funcionalidade de Orçamento', () => {
    const loginUrl = 'https://rentatester.netlify.app';
    const homeUrl = 'https://rentatester.netlify.app/home';
    const orcamentoUrl = 'https://rentatester.netlify.app/orcamento.html';
    const validEmail = 'rent@tester.com';
    const validPassword = '123456';

    beforeEach(() => {
        // Faz login antes de cada teste e navega para a página de orçamento
        cy.visit(loginUrl);
        cy.get('#login').type(validEmail);
        cy.get('#senha').type(validPassword);
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/home.html');
        cy.get('#orcamento').click();
        cy.url().should('include', '/orcamento.html');
    });

    it('Deve selecionar e validar cada tipo de plataforma', () => {
        cy.get('#web').click();
        cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Web');

        cy.get('#mobile').click();
        cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Mobile');

        cy.get('#desktop').click();
        cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Desktop');
    });

    it('Deve selecionar e validar cada tipo de teste', () => {
        cy.get('#humanos').click();
        cy.get('#msg-tipoteste').should('contain', 'Legal, você selecionou a opção de Testes Humanos!');

        cy.get('#multidao').click();
        cy.get('#msg-tipoteste').should('contain', 'Legal, você selecionou a opção de Testes de Multidão!');

        cy.get('#ia').click();
        cy.get('#msg-tipoteste').should('contain', 'Legal, você selecionou a opção de Testes Assistidos por IA!');

        cy.get('#personalizado').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Para um serviço personalizado, entre em contato pelo nosso telefone: 4002-8922.');
        });
    });

    it('Deve preencher e validar o escopo do projeto corretamente', () => {
        cy.get('#tempo-projeto').type('10');
        cy.get('#quantidade-testers').type('5');
        cy.get('#horas-dia').type('8');

        cy.get('#msg-continuar').should('not.exist');
        cy.get('#validacoes-escopo').should('not.exist');
    });

    it('Deve exibir mensagens de erro para preenchimento inadequado do escopo do projeto', () => {
        // Testar tempo do projeto menor que 5 dias
        cy.get('#tempo-projeto').type('4');
        cy.get('#seta-continuar').click();
        cy.get('#validacoes-escopo').should('contain', 'O tempo mínimo para um projeto de testes é 5 dias.');

        // Testar quantidade de testadores fora do intervalo permitido
        cy.get('#tempo-projeto').clear().type('10');
        cy.get('#quantidade-testers').type('0');
        cy.get('#seta-continuar').click();
        cy.get('#validacoes-escopo').should('contain', 'É necessário selecionar entre 1 e 50 testadores.');

        // Testar horas por dia fora do intervalo permitido
        cy.get('#quantidade-testers').clear().type('5');
        cy.get('#horas-dia').type('11');
        cy.get('#seta-continuar').click();
        cy.get('#validacoes-escopo').should('contain', 'O máximo de tempo de trabalho por dia é 10 horas.');
    });

    it('Deve calcular o orçamento corretamente com valores válidos', () => {
        cy.get('#web').click();
        cy.get('#humanos').click();
        cy.get('#tempo-projeto').type('10');
        cy.get('#quantidade-testers').type('5');
        cy.get('#horas-dia').type('8');
        cy.get('#seta-continuar').click();
        cy.get('#resultado').should('not.be.empty');
    });

    it('Deve exibir mensagem de erro ao tentar continuar sem preencher todos os campos necessários', () => {
        cy.get('#seta-continuar').click();
        cy.get('#msg-continuar').should('contain', 'Você precisa preencher todos os campos para continuar!');
    });
});