import { defineConfig } from "cypress";

export default defineConfig({
	allowCypressEnv: false,

	e2e: {
		baseUrl: "http://localhost:5173",
		excludeSpecPattern: [
			"**/e2e/examples",
		],
		// setupNodeEvents(on, config) {
		// 	// implement node event listeners here
		// },
	},
});
