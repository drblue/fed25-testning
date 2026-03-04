import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getMockedLocalStorage } from "../mocks/mockedLocalStorage";
import type { Todo } from "../types/Todo";
import { getTodos, saveTodos } from "../utils/todoStorage";

// Reference to the original localStorage
let originalLocalStorage: Storage;

const TODO: Todo = {
	id: 1,
	title: "My first todo",
	completed: false,
}

beforeEach(() => {
	// Save a reference to the original localStorage before each test
	originalLocalStorage = globalThis.localStorage;

	// Replace localStorage with our mocked version
	globalThis.localStorage = getMockedLocalStorage();
});

afterEach(() => {
	// Restore localStorage to the original version
	globalThis.localStorage = originalLocalStorage;
});

describe("get todos", () => {
	it("returns empty list of todos", () => {
		const todos = getTodos();

		expect(todos).toHaveLength(0);
	});
});

describe("save todos", () => {
	it("can save a todo", () => {
		// save TODO and sure it's ok
		// i.e. test `saveTodos`
		const res = saveTodos([ TODO ]);
		expect(res.success).toBe(true);
	});

	it("can save a todo and then retrieve it", () => {
		// save TODO and then make sure we can retrieve it
		// i.e. test `saveTodos` and check that the saved todo exists when invoking `getTodos`
		const res = saveTodos([ TODO ]);
		expect(res.success).toBe(true);

		const todos = getTodos();
		// expect(todos).toStrictEqual([ TODO ]);
		expect(todos).toContainEqual(TODO);
	});
});
