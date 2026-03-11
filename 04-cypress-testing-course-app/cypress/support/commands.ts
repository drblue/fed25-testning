/// <reference types="cypress" />

// cy.getByDataTest("email-input")
Cypress.Commands.add("getByDataTest", (selector) => {
	return cy.get(`[data-test="${selector}"]`);
});
