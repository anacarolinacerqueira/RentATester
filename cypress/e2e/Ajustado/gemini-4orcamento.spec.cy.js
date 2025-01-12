describe('Página de Orçamento', () => {
  beforeEach(() => {
    // Simula o login e acesso à página de orçamento (ajuste os seletores conforme necessário)
    cy.visit('https://rentatester.netlify.app');
    cy.get('#login').type('rent@tester.com');
    cy.get('#senha').type('123456');
    cy.get('input[type="submit"]').click();
    cy.contains('FAZER ORÇAMENTO').click();
  });

  it('Deve calcular o orçamento corretamente para um cenário básico', () => {
    cy.get('#web').check();
    cy.get('#humanos').check();
    cy.get('#tempo-projeto').type('10');
    cy.get('#quantidade-testers').type('5');
    cy.get('#horas-dia').type('8');
    cy.get('#seta-continuar').click();

    // Assumindo que o resultado do orçamento é exibido em um elemento com id 'resultado'
    cy.get('#resultado')
    .invoke('text')
    .then((text) => {
      const normalizedText = text.replace(/\u00A0/g, ' '); // Substitui o espaço não quebrável por um espaço comum
      expect(normalizedText.trim()).to.equal('R$ 69.000,00'); // Ajuste o valor esperado
    });
  });

  // Outros cenários de teste:

  it('Deve exibir mensagem de erro ao não selecionar plataforma', () => {
    // ...
  });

  it('Deve exibir mensagem de erro ao não selecionar tipo de teste', () => {
    // ...
  });

  it('Deve exibir mensagem de erro ao inserir um tempo de projeto inválido', () => {
    // ...
  });

  // ... outros cenários de teste com diferentes combinações de valores e validações

  // Exemplo de um cenário com valores aleatórios:
  it('Deve calcular o orçamento corretamente para valores aleatórios', () => {
    const plataforma = Cypress._.random(0, 2); // 0: web, 1: mobile, 2: desktop
    const teste = Cypress._.random(0, 3); // 0: humanos, 1: multidao, 2: ia, 3: personalizado
    const tempo = Cypress._.random(5, 30);
    const quantidade = Cypress._.random(1, 50);
    const horas = Cypress._.random(1, 10);

    // Selecionar as opções de acordo com os valores aleatórios
    // ...

    // Calcular o valor esperado do orçamento
    // ...

    // Verificar se o valor calculado é igual ao valor esperado
    // ...
  });
});