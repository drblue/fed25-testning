/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Todo } from "../types/Todo";
import { getTodos, saveTodos } from "../utils/todoStorage";

const TODO: Todo = {
	id: 1,
	title: "My first todo",
	completed: false,
}

// Reset the environment so tests aren't dependent on each other
beforeEach(() => {
	// 🧹 Clear localStorage so we have a deterministic environment
	globalThis.localStorage.clear();
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
