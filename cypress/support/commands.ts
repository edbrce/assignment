/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/');

    cy.get('#nav-login').click();
    cy.get('#email').type(`${Cypress.env('ADMIN_EMAIL')}`);
    cy.get('#password').type(`${Cypress.env('ADMIN_PASSWORD')}`);
    cy.get('#sign-in').click();

    cy.get('#nav-user').contains('admin');
});


declare namespace Cypress {
    interface Chainable {
        login(): Chainable<void>;
    }
}
