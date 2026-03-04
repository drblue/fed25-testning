import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
		// 🕵🏻‍♂️ register a spy on `localStorage.getItem`
		const getItemSpy = vi.spyOn(globalThis.localStorage, "getItem");
		const todos = getTodos();

		// 🔍 make sure that `localStorage.getItem` has been called once
		expect(getItemSpy).toHaveBeenCalledOnce();
		expect(todos).toHaveLength(0);
	});
});

describe("save todos", () => {
	it("can save a todo", () => {
		// 🕵🏻‍♂️ register a spy on `localStorage.setItem`
		const setItemSpy = vi.spyOn(globalThis.localStorage, "setItem");

		// save TODO and sure it's ok
		const res = saveTodos([ TODO ]);

		expect(setItemSpy).toHaveBeenCalledOnce();
		expect(res.success).toBe(true);
	});

	it("can save a todo and then retrieve it", () => {
		// save TODO and then make sure we can retrieve it
		const res = saveTodos([ TODO ]);
		expect(res.success).toBe(true);

		const todos = getTodos();
		// expect(todos).toStrictEqual([ TODO ]);
		expect(todos).toContainEqual(TODO);
	});
});
