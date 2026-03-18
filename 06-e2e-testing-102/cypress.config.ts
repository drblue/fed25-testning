import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "https://fed-firebase-todos.netlify.app/",
		// setupNodeEvents(on, config) {
		// 	// implement node event listeners here
		// },
	},
});
