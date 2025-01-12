describe('Funcionalidade de Orçamento', () => {
    beforeEach(() => {
        // Acessa a página de login
        cy.visit('https://rentatester.netlify.app/login.html');
        
        // Realiza o login com credenciais válidas
        cy.get('#email').type('rent@tester.com');
        cy.get('#senha').type('123456');
        cy.get('#loginButton').click();
        
        // Redireciona para a home
        cy.url().should('include', 'home.html');
        
        // Clica no botão "Fazer orçamento" para acessar a página de orçamento
        cy.get('#orcamentoButton').click();
        
        // Verifica se a página de orçamento foi carregada
        cy.url().should('include', 'orcamento.html');
    });

    it('Deve validar o tipo de plataforma selecionada', () => {
        // Seleciona a plataforma Web
        cy.get('#web').check();
        cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Web');
        
        // Seleciona a plataforma Mobile
        cy.get('#mobile').check();
        cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Mobile');
        
        // Seleciona a plataforma Desktop
        cy.get('#desktop').check();
        cy.get('#msg-plataforma').should('contain', 'Você selecionou a plataforma do tipo Desktop');
    });

    it('Deve validar o tipo de teste selecionado', () => {
        // Seleciona o tipo de teste Testes Humanos
        cy.get('#humanos').check();
        cy.get('#msg-tipoteste').should('contain', 'Você selecionou a opção de Testes Humanos');
        
        // Seleciona o tipo de teste Testes de Multidão
        cy.get('#multidao').check();
        cy.get('#msg-tipoteste').should('contain', 'Você selecionou a opção de Testes de Multidão');
        
        // Seleciona o tipo de teste Testes Assistidos por IA
        cy.get('#ia').check();
        cy.get('#msg-tipoteste').should('contain', 'Você selecionou a opção de Testes Assistidos por IA');
        
        // Seleciona o tipo de teste "Quero algo diferente!"
        cy.get('#personalizado').check();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Para um serviço personalizado');
        });
    });

    it('Deve validar os campos de escopo do projeto', () => {
        // Preenche os campos de escopo com valores válidos
        cy.get('#tempo-projeto').type('10');
        cy.get('#quantidade-testers').type('5');
        cy.get('#horas-dia').type('8');
        
        // Valida se os campos de escopo foram preenchidos corretamente
        cy.get('#validacoes-escopo').should('not.be.visible');
        
        // Tenta submeter com tempo inválido (menor que 5)
        cy.get('#tempo-projeto').clear().type('3');
        cy.get('#validacoes-escopo').should('be.visible').and('contain', 'O tempo mínimo para um projeto de testes é 5 dias.');
        
        // Tenta submeter com quantidade de testadores inválida (maior que 50)
        cy.get('#quantidade-testers').clear().type('60');
        cy.get('#validacoes-escopo').should('be.visible').and('contain', 'É necessário selecionar entre 1 e 50 testadores.');
        
        // Tenta submeter com horas por dia inválidas (maior que 10)
        cy.get('#horas-dia').clear().type('12');
        cy.get('#validacoes-escopo').should('be.visible').and('contain', 'O máximo de tempo de trabalho por dia é 10 horas.');
    });

    it('Deve validar o preenchimento completo antes de calcular o orçamento', () => {
        // Verifica se a validação de preenchimento obrigatório está funcionando
        cy.get('#web').check();
        cy.get('#humanos').check();
        cy.get('#tempo-projeto').type('10');
        cy.get('#quantidade-testers').type('5');
        cy.get('#horas-dia').type('8');
        
        // Limpa um campo de escopo para testar a validação
        cy.get('#quantidade-testers').clear();
        cy.get('#msg-continuar').should('contain', 'Você precisa preencher todos os campos para continuar!');
    });

    it('Deve calcular corretamente o orçamento com valores válidos', () => {
        // Preenche todos os campos necessários para o cálculo do orçamento
        cy.get('#web').check();
        cy.get('#humanos').check();
        cy.get('#tempo-projeto').type('10');
        cy.get('#quantidade-testers').type('5');
        cy.get('#horas-dia').type('8');
        
        // Clica no botão para calcular o orçamento
        cy.get('#seta-continuar').click();
        
        // Verifica se o orçamento foi calculado corretamente
        cy.get('#resultado').should('be.visible');
        
        // Verifica se o valor do orçamento é exibido com a formatação correta (moeda BRL)
        cy.get('#resultado').should('match', /R\$\s\d{1,3}(\.\d{3})*(,\d{2})?/);
    });

    it('Deve permitir que o usuário faça um novo orçamento', () => {
        // Após o cálculo do orçamento, verifica se a opção de fazer um novo orçamento aparece
        cy.get('#novo-orcamento').should('contain', 'Fazer um novo Orçamento');
        cy.get('#novo-orcamento').click();
        
        // Verifica se os campos de orçamento foram resetados
        cy.get('#msg-plataforma').should('not.be.visible');
        cy.get('#msg-tipoteste').should('not.be.visible');
        cy.get('#validacoes-escopo').should('not.be.visible');
        cy.get('#resultado').should('not.be.visible');
    });
});