/// <reference types="cypress" />

context('Woocommerce', () => {
    before( function ()  {
        cy.createProduct().then( (response) =>{
            expect(response.status).to.eq(201)
            return response.body
        }).as('product_created')
    })
  
    it('Test 1', function () {
        cy.visit(this.product_created.permalink)
        cy.fixture('product.json').as('product')
        cy.get('@product')
        .then((product) =>{
            cy.get('head title')
        .should('contain', product.name)
        })
        cy.get('@product')
        .then((product) =>{
            cy.get('.product_title').should('have.text', product.name)
            cy.get('.summary > .price > .amount').should('have.text',`$${product.price}`)
            cy.get('.quantity >.input-text').clear().type(product.quantity)
            cy.get('.quantity >.input-text').should('have.value',product.quantity)
        })
        cy.get('button[name="add-to-cart"]').click()
        cy.get('@product')
        .then((product) => {
            cy.get('.cart-contents').contains(product.quantity)
        })
        cy.get('.cart-contents > .count').should('be.visible').click()
        cy.location('href').should('eq', Cypress.env('cartURL'));
        cy.get('.woocommerce .cart_item').should('be.visible')
        cy.get('@product')
        .then((product) =>{
            cy.get('.product-price > .amount').should('have.text',`$${product.price}`)
            cy.get('.quantity >.input-text').should('have.value',product.quantity)
        })
    })

    after(function () {
        cy.deleteProduct(this.product_created.id).then((response) =>{
            expect(response.status).to.eq(200)
      })
  })
})

  