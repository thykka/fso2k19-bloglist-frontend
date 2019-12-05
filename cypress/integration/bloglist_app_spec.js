

describe('Bloglist ', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('front page can be opened', function() {
    cy.contains('Bloglist');
  });

  it('allows sending the login form', function() {
    cy.get('input:first').type('wrong');
    cy.get('input:last').type('credentials');
    cy.contains('Log in').click();
  });

  it('allows login with correct credentials', function() {
    cy.get('input:first').type('anew');
    cy.get('input:last').type('supersecret');
    cy.contains('Log in').click();
    cy.contains('Logged in as @anew');
  });
});
