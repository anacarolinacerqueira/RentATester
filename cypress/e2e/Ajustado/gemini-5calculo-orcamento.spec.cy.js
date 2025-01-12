describe('Cálculo do Orçamento', () => {
  beforeEach(() => {
    // ... (mesmo setup do teste anterior, com login e acesso à página de orçamento)
    // Simula o login e acesso à página de orçamento (ajuste os seletores conforme necessário)
    cy.visit('https://rentatester.netlify.app');
    cy.get('#login').type('rent@tester.com');
    cy.get('#senha').type('123456');
    cy.get('input[type="submit"]').click();
    cy.contains('FAZER ORÇAMENTO').click();
  });

  // Cenários de teste com diferentes combinações
  it('Deve calcular corretamente para Web, Testes Humanos, 10 dias, 5 testadores, 8 horas/dia', () => {
    cy.get('#web').check();
    cy.get('#humanos').check();
    cy.get('#tempo-projeto').type('10');
    cy.get('#quantidade-testers').type('5');
    cy.get('#horas-dia').type('8');
    cy.get('#seta-continuar').click();

    // Assumindo que o resultado do orçamento é exibido em um elemento com id 'resultado'
    cy.get('#resultado').then(($resultado) => {
      const valorEsperado = 69000; // Ajuste o valor esperado de acordo com o seu cálculo
      const textoResultado = $resultado.text().replace(/\u00A0/g, ' '); // Substitui espaço não quebrável
      const valorCalculado = parseFloat(
        textoResultado.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
      );
      expect(valorCalculado).to.equal(valorEsperado);
    });
  });

  it('Deve calcular corretamente para Mobile, Testes de Multidão, 20 dias, 20 testadores, 6 horas/dia', () => {
    // ... (configurar os valores e verificar o resultado)
  });

  it('Deve calcular corretamente para Desktop, Testes Assistidos por IA, 5 dias, 2 testadores, 4 horas/dia', () => {
    // ... (configurar os valores e verificar o resultado)
  });

  // Cenário com valores aleatórios para testar diferentes combinações
  it('Deve calcular corretamente para valores aleatórios', () => {
    const plataformas = ['web', 'mobile', 'desktop'];
    const testes = ['humanos', 'multidao', 'ia', 'personalizado'];

    // Gerar valores aleatórios para tempo, quantidade de testadores e horas por dia
    const tempo = Cypress._.random(5, 30);
    const quantidade = Cypress._.random(1, 50);
    const horas = Cypress._.random(1, 10);

    // Selecionar opções aleatórias
    const plataformaAleatoria = Cypress._.sample(plataformas);
    const testeAleatorio = Cypress._.sample(testes);

    // Configurar os campos e calcular o valor esperado
    // ...

    // Verificar se o valor calculado é igual ao valor esperado
    // ...
  });
});