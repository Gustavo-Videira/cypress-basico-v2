// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
	const THREE_SECONDS_IN_MS = 3000

	beforeEach(() => {
		cy.visit('./src/index.html')
	})

	it('verifica o título da aplicação', function() {
		cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
	})

	// Seção 3 - Exercicio 1
	it('preenche os campos obrigatórios e envia o formulário', function() {
		cy.clock()

		cy.get('#firstName').type('Gustavo')
		cy.get('#lastName').type('Henrique')
		cy.get('#email').type('gustavo@exemplo.com')
		cy.get('#open-text-area').type('Teste de automação cypress', {delay: 0})
		
		cy.get('button[type="submit"]').click()
		cy.get('.success').should('be.visible')
		cy.tick(THREE_SECONDS_IN_MS)
		cy.get('.success').should('not.be.visible')
	})

	// Seção 3 - Exercicio 2
	it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
		cy.clock()

		cy.get('#firstName').type('Gustavo')
		cy.get('#lastName').type('Henrique')
		cy.get('#email').type('gustavo@exemplo,com')
		cy.get('#open-text-area').type('Teste de automação cypress', {delay: 0})

		cy.get('button[type="submit"]').click()
		cy.get('.error').should('be.visible')
		cy.tick(THREE_SECONDS_IN_MS)
		cy.get('.error').should('not.be.visible')
	})

	// Seção 3 - Exercicio 3
	it('validação de tipo do input de telefone', function() {
		cy.get('#phone').type('abcdefghij').should('have.value', '')
	})

	// Seção 3 - Exercicio 4
	it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
		cy.get('#firstName').type('Gustavo')
		cy.get('#lastName').type('Henrique')
		cy.get('#email').type('gustavo@exemplo.com')
		cy.get('#phone-checkbox').check()
		cy.get('#open-text-area').type('Teste de automação cypress', {delay: 0})
		
		cy.get('button[type="submit"]').click()
		cy.get('.error').should('be.visible')
	})

	// Seção 3 - Exercicio 5
	it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
		cy.get('#firstName')
			.type('Gustavo')
			.should('have.value', 'Gustavo')
			.clear()
			.should('have.value', '')
		
		cy.get('#lastName')
			.type('Henrique')
			.should('have.value', 'Henrique')
			.clear()
			.should('have.value', '')
		
		cy.get('#email')
			.type('gustavo@exemplo.com')
			.should('have.value', 'gustavo@exemplo.com')
			.clear()
			.should('have.value', '')
		
		cy.get('#phone')
			.type('1899999999')
			.should('have.value', '1899999999')
			.clear()
			.should('have.value', '')
	})

	// Seção 3 - Exercicio 6
	it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
		cy.get('button[type="submit"]').click()
		cy.get('.error').should('be.visible')
	})

	// Seção 3 - Exercicio 7
	it('envia o formuário com sucesso usando um comando customizado', function() {
		cy.fillMandatoryFieldsAndSubmit()

		cy.get('.success').should('be.visible')
	})

	// Seção 3 - Exercicio 8
	it('utilizando contains para localizar button', function() {
		cy.contains('button', 'Enviar').click()
		cy.get('.error').should('be.visible')
	})

	// Seção 4 - Exercicio 1
	it('seleciona um produto (YouTube) por seu texto', function() {
		cy.get('#product').select('YouTube').should('have.value', 'youtube')
	})

	// Seção 4 - Exercicio 2
	it('seleciona um produto (Mentoria) por seu valor (value)', function() {
		cy.get('#product').select('mentoria').should('have.value', 'mentoria')
	})

	// Seção 4 - Exercicio 3
	it('seleciona um produto (Blog) por seu índice', function() {
		cy.get('#product').select(1).should('have.value', 'blog')
	})

	// Seção 5 - Exercicio 1
	it('marca o tipo de atendimento "Feedback"', function() {
		cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
	})

	// Seção 5 - Exercicio 2
	it('marca cada tipo de atendimento', function() {
		cy.get('input[type="radio"]')
			.should('have.length', 3)
			.each(function ($item) {
				cy.wrap($item).check()
				cy.wrap($item).should('be.checked')
			})
	})

	// Seção 6 - Exercicio 1
	it('marca ambos checkboxes, depois desmarca o último', function() {
		cy.get('#check input[type="checkbox"]')
			.check()
			.last()
			.uncheck()
			.should('not.be.checked')
	})
	
	// Seção 7 - Exercicio 1
	it('seleciona um arquivo da pasta fixtures', function() {
		cy.get('#file-upload')
			.should('not.have.value')
			.selectFile('./cypress/fixtures/example.json')
			.should(function ($item) {
				expect($item[0].files[0].name).to.equal('example.json')
			})
	})

	// Seção 7 - Exercicio 2
	it('seleciona um arquivo simulando um drag-and-drop', function() {
		cy.get('#file-upload')
			.should('not.have.value')
			.selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
			.should(function ($item) {
				expect($item[0].files[0].name).to.equal('example.json')
			})
	})

	// Seção 7 - Exercicio 3
	it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
		cy.fixture('example.json').as('sampleFile')
		cy.get('#file-upload')
			.should('not.have.value')
			.selectFile('@sampleFile')
			.should(function ($item) {
				expect($item[0].files[0].name).to.equal('example.json')
			})
	})

	// Seção 8 - Exercicio 1
	it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
		cy.get('#privacy a').should('have.attr', 'target', '_blank')
	})

	// Seção 8 - Exercicio 2
	it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
		cy.get('#privacy a')
			.invoke('removeAttr', 'target')
			.click()

		cy.contains('CAC TAT - Política de privacidade').should('be.visible')
	})

	// Seção 8 - Exercicio 3
	it('testa a página da política de privavidade de forma independente', function() {
		cy.visit('./src/privacy.html')
		cy.contains('CAC TAT - Política de privacidade').should('be.visible')
	})

	// Seção 12 - Exercicio 3
	it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
		cy.get('.success')
		  .should('not.be.visible')
		  .invoke('show')
		  .should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
		  .invoke('hide')
		  .should('not.be.visible')
		cy.get('.error')
		  .should('not.be.visible')
		  .invoke('show')
		  .should('be.visible').and('contain', 'Valide os campos obrigatórios!')
		  .invoke('hide')
		  .should('not.be.visible')
	})

	// Seção 12 - Exercicio 4
	it('preenche a area de texto usando o comando invoke', function() {
		const longText = Cypress._.repeat('0123456789', 20)

		cy.get('#open-text-area')
			.invoke('val', longText)
			.should('have.value', longText)
	})

	// Seção 12 - Exercicio 5
	it('faz uma requisição HTTP', function() {
		// cy.request({
		// 	method: 'GET',
		// 	url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
		// }).then((response) => {
		// 	expect(response.status).to.equal(200)
		// 	expect(response.statusText).to.equal('OK');
		// 	expect(response.body).contain('CAC TAT')
		// })

		cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
			.should(function (response) {
				const { status, statusText, body } = response
				expect(status).to.equal(200)
				expect(statusText).to.equal('OK')
				expect(body).to.include('CAC TAT')
			})
	})

	// Seção 13 - Exercicio 1
	it('encontre o gato escondido', function() {
		cy.get('#cat')
			.invoke('show')
			.should('be.visible')
		cy.get('#title')
			.invoke('text', 'CAT TAT')
		cy.get('#subtitle')
			.invoke('text', 'Eu 🖤 gatos!')
	})
})