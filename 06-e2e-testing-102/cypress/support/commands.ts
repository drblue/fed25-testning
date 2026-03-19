/// <reference types="cypress" />

Cypress.Commands.add("login", (email, password) => {
	cy.get(`input[type="email"]`).type(email, { delay: 10 });
	cy.get(`input[type="password"]`).type(password);
	cy.get(`button[type="submit"]`).click();
});

Cypress.Commands.add("logout", () => {
	cy.visit("/logout");

	// Make sure we've actually been logged out as it takes a small amount of time
	cy.location("pathname").should("equal", "/login");
});
