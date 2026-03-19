const snelhest = {
	email: "snelhest2000@gmail.com",
	password: "appapp",
}

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

	context("Can authenticate", () => {
		beforeEach(() => {
			cy.visit("/login");
		});

		afterEach(() => {
			cy.visit("/logout");

			// Make sure we've actually been logged out as it takes a small amount of time
			cy.location("pathname").should("equal", "/login");
		});

		it("Can log in with an existing user", () => {
			cy.login(snelhest.email, snelhest.password);

			cy.location("pathname").should("equal", "/");
		});
	});
});
