import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getTodos } from "../utils/todoStorage";
import { getMockedLocalStorage } from "../mocks/mockedLocalStorage";

// Reference to the original localStorage
let originalLocalStorage: Storage;

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
	it.todo("can save a todo", () => {});

	it.todo("can save a todo and then retrieve it", () => {});
});
