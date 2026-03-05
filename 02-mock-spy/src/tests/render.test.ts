/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";
import testTodos from "./data/todos";
import type { Todo } from "../types/Todo";

/**
 * Helper function for rendering todos to DOM
 *
 * @param todos Array of todos
 * @returns Reference to UL-element in DOM
 */
const renderTodosToDOM = (todos: Todo[]) => {
	const lis = transformTodosToHtml(todos);
	document.body.innerHTML = `<ul id="todos">${lis}</ul>`;
	return document.querySelector<HTMLUListElement>("#todos")!;
}

describe("transform todos", () => {
	it("should output empty list when no todos exist", () => {
		const lis = transformTodosToHtml([]);
		expect(lis).toBe("");
	});

	it("should output list with one todo", () => {
		const ulEl = renderTodosToDOM([ testTodos[0] ]);

		// query UL for any listitems with the `todo` class
		const liEls = ulEl.querySelectorAll("li.todo");
		expect(liEls).toHaveLength(1);
	});

	it.todo("should output list with many todo", () => {});

	it.todo("should output list with one completed todo", () => {});

	it.todo("should output list with one todo that isn't completed", () => {});
});
