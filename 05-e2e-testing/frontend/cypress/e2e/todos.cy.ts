describe("Todos", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should be able to visit the page", () => {
		cy.get("h1").contains("Todos");
	});

	it("should find at least one todo", () => {
		cy.get("#todos").find("li").should("have.length.at.least", 1);
	});

	context("Create todo", () => {
		it("create todo form should be empty", () => {
			cy.get("input[type=\"text\"]").should("have.value", "");
		});

		it.only("can't create a todo without a title", () => {
			// cy.get("input[type=\"text\"]").type("{enter}");
			cy.get("[type=\"submit\"]").click();

			cy.get('#error')
				.should("be.visible")
				.contains("Title cannot be empty");
				// .contains(/title cannot be empty/i);
		});

		it.skip("can create a new todo, input-field is cleared and todo appears in the list");

		it.skip("can type in the 'create todo' form and then reset the form");
	});
});
