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
		it.only("create todo form should be empty", () => {
			cy.get("input[type=\"text\"]").should("have.value", "");
		});

		it.skip("can't create a todo without a title");

		it.skip("can create a new todo, input-field is cleared and todo appears in the list");

		it.skip("can type in the 'create todo' form and then reset the form");
	});
});
