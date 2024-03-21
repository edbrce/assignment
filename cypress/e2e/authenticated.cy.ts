describe('Authenticated', () => {
    before(() => {
        cy.login();
    });

    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Should see the admin username and home page', () => {
        cy.get('#nav-user').contains('Hi admin');
    });

    it('should go to the post page when the post button hit and authenticated', () => {
        cy.get('#make-post').click();
        cy.get('h1').contains('Post');
    });
});
