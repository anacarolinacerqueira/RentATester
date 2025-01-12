describe('Validação do Cálculo de Orçamento', () => {
    beforeEach(() => {
        // Acessa a página de login
        cy.visit('https://rentatester.netlify.app');
        
        // Realiza o login com credenciais válidas
        cy.get('#login').type('rent@tester.com');
        cy.get('#senha').type('123456');
        cy.get('input[type="submit"]').click();
        
        // Redireciona para a home
        cy.url().should('include', 'home.html');
        
        // Clica no botão "Fazer orçamento" para acessar a página de orçamento
        cy.get('#orcamento').click();
        
        // Verifica se a página de orçamento foi carregada
        cy.url().should('include', 'orcamento.html');
    });

    it('Deve calcular o orçamento corretamente para plataforma Web e Testes Humanos', () => {
        // Seleciona a plataforma Web
        cy.get('#web').check();
        
        // Seleciona o tipo de teste Testes Humanos
        cy.get('#humanos').check();
        
        // Preenche os campos de escopo
        cy.get('#tempo-projeto').type('10');
        cy.get('#quantidade-testers').type('5');
        cy.get('#horas-dia').type('8');
        
        // Clica no botão para calcular o orçamento
        cy.get('#seta-continuar').click();
        
        // Calcula o valor esperado do orçamento
        const tipoPlataforma = 0.15;
        const tipoTeste = 150;
        const tempo = 10;
        const qtdTesters = 5;
        const horasDia = 8;
        
        const orcamentoEsperado = tipoTeste * (qtdTesters * horasDia * tempo) + (tipoTeste * (qtdTesters * horasDia * tempo) * tipoPlataforma);
        
        // Verifica se o valor calculado é igual ao valor esperado
        cy.get('#resultado').should('contain', orcamentoEsperado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    });

    it('Deve calcular o orçamento corretamente para plataforma Mobile e Testes de Multidão', () => {
        // Seleciona a plataforma Mobile
        cy.get('#mobile').check();
        
        // Seleciona o tipo de teste Testes de Multidão
        cy.get('#multidao').check();
        
        // Preenche os campos de escopo
        cy.get('#tempo-projeto').type('8');
        cy.get('#quantidade-testers').type('10');
        cy.get('#horas-dia').type('6');
        
        // Clica no botão para calcular o orçamento
        cy.get('#seta-continuar').click();
        
        // Calcula o valor esperado do orçamento
        const tipoPlataforma = 0.4;
        const tipoTeste = 50;
        const tempo = 8;
        const qtdTesters = 10;
        const horasDia = 6;
        
        const orcamentoEsperado = tipoTeste * (qtdTesters * horasDia * tempo) + (tipoTeste * (qtdTesters * horasDia * tempo) * tipoPlataforma);
        
        // Verifica se o valor calculado é igual ao valor esperado
        cy.get('#resultado').should('contain', orcamentoEsperado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    });

    it('Deve calcular o orçamento corretamente para plataforma Desktop e Testes Assistidos por IA', () => {
        // Seleciona a plataforma Desktop
        cy.get('#desktop').check();
        
        // Seleciona o tipo de teste Testes Assistidos por IA
        cy.get('#ia').check();
        
        // Preenche os campos de escopo
        cy.get('#tempo-projeto').type('12');
        cy.get('#quantidade-testers').type('3');
        cy.get('#horas-dia').type('7');
        
        // Clica no botão para calcular o orçamento
        cy.get('#seta-continuar').click();
        
        // Calcula o valor esperado do orçamento
        const tipoPlataforma = 0.1;
        const tipoTeste = 100;
        const tempo = 12;
        const qtdTesters = 3;
        const horasDia = 7;
        
        const orcamentoEsperado = tipoTeste * (qtdTesters * horasDia * tempo) + (tipoTeste * (qtdTesters * horasDia * tempo) * tipoPlataforma);
        
        // Verifica se o valor calculado é igual ao valor esperado
        cy.get('#resultado').should('contain', orcamentoEsperado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    });

    it('Deve calcular o orçamento corretamente para plataforma Web e Teste Personalizado', () => {
        // Seleciona a plataforma Web
        cy.get('#web').check();
        
        // Seleciona o tipo de teste "Quero algo diferente!"
        cy.get('#personalizado').check();
        
        // Exibe o alerta personalizado
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Para um serviço personalizado');
        });
        
        // Não prossegue com o cálculo, pois o orçamento precisa ser calculado com outro tipo de teste
        cy.get('#resultado').should('be.visible');
    });

    it('Deve calcular o orçamento corretamente para diferentes combinações de plataforma, tipo de teste e escopo', () => {
        // Seleciona a plataforma Mobile
        cy.get('#mobile').check();
        
        // Seleciona o tipo de teste Testes Humanos
        cy.get('#humanos').check();
        
        // Preenche os campos de escopo
        cy.get('#tempo-projeto').type('15');
        cy.get('#quantidade-testers').type('8');
        cy.get('#horas-dia').type('5');
        
        // Clica no botão para calcular o orçamento
        cy.get('#seta-continuar').click();
        
        // Calcula o valor esperado do orçamento
        const tipoPlataforma = 0.4;
        const tipoTeste = 150;
        const tempo = 15;
        const qtdTesters = 8;
        const horasDia = 5;
        
        const orcamentoEsperado = tipoTeste * (qtdTesters * horasDia * tempo) + (tipoTeste * (qtdTesters * horasDia * tempo) * tipoPlataforma);
        
        // Verifica se o valor calculado é igual ao valor esperado
        cy.get('#resultado').should('contain', orcamentoEsperado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    });
});