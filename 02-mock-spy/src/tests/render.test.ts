import { describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";

describe("transform todos", () => {
	it("should output empty list when no todos exist", () => {
		const lis = transformTodosToHtml([]);
		expect(lis).toBe("");
	});

	it.todo("should output list with one todo", () => {});
});
