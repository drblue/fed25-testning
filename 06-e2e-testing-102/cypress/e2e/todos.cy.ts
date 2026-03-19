describe("Firebase Todos", () => {
	context("Can't access protected routes without authenticating first", () => {
		it("Should redirect to login-page when trying to access todos", () => {
			cy.visit("/todos");

			// Check that URL is not /todos
			cy.location("pathname").should("not.equal", "/todos");

			// Check that URL is /login
			cy.location("pathname").should("equal", "/login");
		});
	});
});
