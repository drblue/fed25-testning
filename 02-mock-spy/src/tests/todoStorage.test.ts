import { describe, expect, it } from "vitest";
import { getTodos } from "../utils/todoStorage";

describe("get todos", () => {
	it("returns empty list of todos", () => {
		const todos = getTodos();

		expect(todos).toHaveLength(0);
	});
});

describe("save todos", () => {
	it.todo("can save a todo", () => {});

	it.todo("can save a todo and then retrieve it", () => {});
});
