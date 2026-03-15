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
});
