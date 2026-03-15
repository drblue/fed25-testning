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

		it("can't create a todo without a title", () => {
			// cy.get("input[type=\"text\"]").type("{enter}");
			cy.get("[type=\"submit\"]").click();

			cy.get('#error')
				.should("be.visible")
				.contains("Title cannot be empty");
				// .contains(/title cannot be empty/i);
		});

		it("can create a new todo, input-field is cleared and todo appears in the list", {
			defaultCommandTimeout: 10000,  // wait **up to** 10 seconds when looking for an element
		}, () => {
			const todoTitle = "Too many todos, didn't read " + Date.now();

			// type todo title and then submit form by pressing the enter-key
			cy.get("input[type=\"text\"]")
				.type(todoTitle)
				.type("{enter}");

			// expect that a todo with the title exists (last) in the list
			cy.get("#todos")
				.find("li")
				.last()
				.contains(todoTitle);

			// expect input to be empty
			cy.get("input[type=\"text\"]")
				.should("have.value", "");
		});

		it.only("can type in the 'create todo' form and then reset the form", () => {
			// type something in the input field
			cy.get("input[type=\"text\"]")
				.type("My ephemeral todo");

			// click the reset button
			cy.get("[type=\"reset\"]")
				.click();

			// expect input to be empty
			cy.get("input[type=\"text\"]")
				.should("have.value", "");
		});
	});
});
