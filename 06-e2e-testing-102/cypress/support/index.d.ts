declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to log in a user
		 * @example cy.login("snel@hest.gov", "hö jette-gått")
		 */
		login(email: string, password: string): Chainable<void>;

		/**
		 * Custom command to log out the current user
		 * @example cy.logout()
		 */
		logout(): Chainable<void>;
	}
}
