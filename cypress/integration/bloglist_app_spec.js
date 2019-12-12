/* global cy */

describe('Bloglist ', function() {
  beforeEach(function() {
    cy.request('POST', '/api/testing/reset');
    const user = {
      name: 'Cypress Test Runner',
      username: 'cypress',
      password: 'cypress7357'
    };
    cy.request('POST', '/api/users/', user);
    cy.visit('/');
  });

  describe('when not logged in', function() {
    it('front page can be opened', function() {
      cy.contains('Bloglist');
    });

    it('allows sending the login form', function() {
      cy.get('input:first').type('wrong');
      cy.get('input:last').type('credentials');
      cy.contains('Log in').click();
    });
  });

  describe('when logged in', function() {
    beforeEach(function() { // log in with test credentials
      cy.get('#login-username').type('cypress');
      cy.get('#login-password').type('cypress7357');
      cy.contains('Log in').click();
      cy.contains('Logged in as @cypress');
    });

    it('username of the user is displayed', function() {
      cy.contains('cypress');
    });

    describe('after posting a new blog', function() {
      beforeEach(function() {
        cy.contains('New blog').click();
        cy.get('#newblog-title').type('E2E testing with Cypress');
        cy.get('#newblog-author').type('Snoop Dogg');
        cy.get('#newblog-url').type('http://example.com');
        cy.get('#newblog-submit').click();
      });

      describe('after opening the blog entry', function() {
        beforeEach(function() {
          cy.contains('E2E testing with Cypress').click();
        });

        it('displays the blog', function() {
          cy.contains('Posted by: Cypress Test Runner');
        });

        it('allows upvoting the blog', function() {
          cy.contains('Updoot').click();
          cy.contains('Likes: 1');
        });

        it('allows deleting the blog', function() {
          cy.contains('Baleet').click();
        });
      });
    });
  });
});
