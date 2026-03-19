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
			cy.logout();
		});

		it("Can log in with an existing user", () => {
			cy.login(snelhest.email, snelhest.password);

			cy.location("pathname").should("equal", "/");
		});

		it("Can log in with an existing user and visit todos page", () => {
			cy.login(snelhest.email, snelhest.password);
			cy.visit("/todos");
			cy.location("pathname").should("equal", "/todos");
		});
	});

	context.only("Todo actions", () => {
		beforeEach(() => {
			cy.visit("/login");
			cy.login(snelhest.email, snelhest.password);

			// Wait for login to succeed
			cy.location("pathname").should("equal", "/");
		});

		afterEach(() => {
			cy.logout();
		});

		it("All todos should have a title", () => {
			cy.visit("/todos");

			cy.get(".todolist .todo-title")
				.each(($el) => {
					// $el is a jQuery-wrapped element
					cy.wrap($el).should("not.be.empty");
				});
		});
	});
});
