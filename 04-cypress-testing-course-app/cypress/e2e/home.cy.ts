describe("Home Page", () => {
	beforeEach(() => {
		// Visit page
		cy.visit("/");

		// Wait for the app to be fully hydrated and visible 💦
		cy.get("#__next").should("be.visible");
	});

	context("Hero section", () => {
		it("the h1 contains the correct text", () => {
			// Find the h1 and verify content
			// cy.get('[data-test="hero-heading"]')  // 🫤
			cy.get("h1")
				.contains("Testing Next.js Applications with Cypress");
		});

		it("the features on the homepage are correct", () => {
			// Find the first definition term and verify content
			cy.get("dt").eq(0).contains("4 Courses");

			// Find the second definition term and verify content
			cy.get("dt").eq(1).contains("25+ Lessons");

			// Find the third definition term and verify content
			cy.get("dt").eq(2).contains("Free and Open Source");
		});
	});

	context("Courses section", () => {
		it("Course: Testing Your First Next.js Application", () => {
			// Find link with text "Get started" and click on it
			cy.getByDataTest("course-0")
				.find("a")
				// .contains("Get started")
				.eq(-1)  // alternative way, gets the last element from the array
				.click();

			// Make sure we're redirected to the correct page
			cy.location("pathname")
				.should("equal", "/testing-your-first-application");
		});
	});
});
