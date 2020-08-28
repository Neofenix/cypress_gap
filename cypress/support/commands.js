// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("createProduct", () => {
  cy.fixture('product.json').then(function (data) {
    return cy.request({
      method: 'POST',
      url: 'wp-json/wc/v3/products/',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "name": data.name,
        "type": "simple",
        "regular_price": data.price,
        "description": "Test",
        "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        "categories": [
          {
            "id": 9
          },
          {
            "id": 14
          }
        ],
        "images": [
          {
            "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
          },
          {
            "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg"
          }
        ]
      },
      auth: {
          username: Cypress.env('username'),
          password: Cypress.env('password')
      }
    })
  })
  })

  Cypress.Commands.add("deleteProduct", (id) => {
    return cy.request({
      method: 'DELETE',
      url:  `wp-json/wc/v3/products/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      qs:{
        'force':'true'
      },
      auth: {
        username: Cypress.env('username'),
        password: Cypress.env('password')
      }
    })
  })
