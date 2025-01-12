describe('Budget Calculation Validation', () => {
  const testScenarios = [
    {
      name: 'Web - Testes Humanos',
      platform: '#web',
      testType: '#humanos',
      platformFactor: 0.15,
      testTypeFactor: 150
    },
    {
      name: 'Mobile - Testes de Multidão',
      platform: '#mobile',
      testType: '#multidao',
      platformFactor: 0.4,
      testTypeFactor: 50
    },
    {
      name: 'Desktop - Testes de IA',
      platform: '#desktop',
      testType: '#ia',
      platformFactor: 0.1,
      testTypeFactor: 100
    }
  ];
 
  const scopeTestCases = [
    { days: 5, testers: 1, hoursPerDay: 5 },
    { days: 10, testers: 10, hoursPerDay: 8 },
    { days: 15, testers: 25, hoursPerDay: 10 }
  ];
 
  beforeEach(() => {
    cy.visit('https://rentatester.netlify.app/');
    cy.get('#login').type('rent@tester.com');
    cy.get('#senha').type('123456');
    cy.get('input[type="submit"]').click();
    cy.get('#orcamento').click();
  });
 
  testScenarios.forEach(scenario => {
    scopeTestCases.forEach(scope => {
      it(`Validar orçamento para ${scenario.name} com escopo de ${scope.days} dias`, () => {
        // Selecionar plataforma e tipo de teste
        cy.get(scenario.platform).check();
        cy.get(scenario.testType).check();
 
        // Preencher escopo do projeto
        cy.get('#tempo-projeto').type(scope.days.toString());
        cy.get('#quantidade-testers').type(scope.testers.toString());
        cy.get('#horas-dia').type(scope.hoursPerDay.toString());
 
        // Calcular orçamento
        cy.get('#seta-continuar').click();
 
        // Validar cálculo
        cy.get('#resultado').then(($result) => {
          const resultValue = parseFloat($result.text().replace('R$', '').replace('.', '').replace(',', '.'));
 
          // Cálculo manual para comparação
          const manualCalculation = (
            scenario.testTypeFactor * 
            (scope.testers * scope.hoursPerDay * scope.days) * 
            (1 + scenario.platformFactor)
          );
 
          // Comparar com margem de precisão
          expect(Math.abs(resultValue - manualCalculation)).to.be.lessThan(0.01);
        });
      });
    });
  });
 });