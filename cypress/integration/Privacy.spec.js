describe('CAC TAT - Política de privacidade', function() {
	// Seção 8 - Exercicio 3
	it('testa a página da política de privavidade de forma independente', function() {
		cy.visit('./src/privacy.html')
		cy.contains('CAC TAT - Política de privacidade').should('be.visible')
	})
})