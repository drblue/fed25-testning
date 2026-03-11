describe("template spec", () => {
	it("the h1 contains the correct text", () => {
		cy.visit("http://localhost:3000");

		// Wait for the app to be fully hydrated and visible 💦
		cy.get("#__next").should("be.visible");

		cy.get("h1").contains("Testing Next.js Applications with Cypress");
	});
});
