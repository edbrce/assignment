describe('Unauthenticated', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should load the home page', () => {
        cy.get('h1').contains('Welcome to IMDb support forums');

        cy.get('#nav-login').contains('Login');
    });

    it('should load the sign up page when login clicked', () => {
        cy.get('#nav-login').click();

        cy.get('h1').contains('Sign In');
    });

    it('should re-direct to the login page when post button hit and unauthenticated', () => {
        cy.get('#make-post').click();
        cy.get('h1').contains('Sign In');
    });
});
