describe("Todos", () => {
	context("Initial state", () => {
		beforeEach(() => {
			// Intercept GET requests to http://localhost:3001/todos
			// Inline data is bad data 😤
			/*
			cy.intercept("GET", "http://localhost:3001/todos", [
				{ id: 1337, title: "I like todos and I cannot lie", completed: false },
			]).as("getTodos");
			*/

			// Fixtures 🦿
			cy.intercept("GET", "http://localhost:3001/todos", {
				fixture: "todos.json",
			}).as("getTodos");

			cy.visit("/");
		});

		it("should be able to visit the page", () => {
			cy.get("h1").contains("Todos");
		});

		it("should find two mocked todos", () => {
			// Wait for request to be intercepted before continuing with the test
			// (not really need in this case, so just for demonstration purposes)
			cy.wait("@getTodos");

			cy.get("#todos")
				.find("li")
				.should("have.length", 2);

			cy.get("#todos")
				.find("li")
				.first()
				.should("have.class", "completed")
				.contains("I like todos and I cannot lie");

			cy.get("#todos")
				.find("li")
				.last()
				.should("not.have.class", "completed")
				.contains("I like E2E-tests very much, and I lie");
		});

		it("should not show error dialog", () => {
			cy.get("[role=\"alert\"]")
				.should("not.be.visible");
		});
	});

	context("Create todo", () => {
		beforeEach(() => {
			cy.visit("/");
		});

		it("create todo form should be empty", () => {
			cy.get("input[type=\"text\"]").should("have.value", "");
		});

		it("can't create a todo without a title", () => {
			// cy.get("input[type=\"text\"]").type("{enter}");
			cy.get("[type=\"submit\"]").click();

			cy.get("[role=\"alert\"]")
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

		it("can type in the 'create todo' form and then reset the form", () => {
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

	context.only("Todo ID", () => {
		it("should get the first todo ID", () => {
			// Visit the page
			cy.visit("/");

			/*
			cy.get("#todos")
				.find("li")
				.first()
				.invoke("attr", "data-todo-id")
				.then(todoId => {
					console.log("Todo Id of the first todo is:", todoId);
				});
			*/

			cy.get("#todos")
				.find("li")
				.first()
				.invoke("attr", "data-todo-id")
				.as("todoId");

			cy.get("@todoId").then(todoId => {
				// Do something
				console.log("Todo Id of the first todo is:", todoId);
			});
		});
	});
});
