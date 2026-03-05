/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";
import testTodos from "./data/todos";
import type { Todo } from "../types/Todo";

// Find the first completed todo (or return the first todo but set completed to true)
const getOneCompletedTodo = (): Todo => {
	const completedTodo = testTodos.find(todo => todo.completed);
	if (completedTodo) {
		return completedTodo;
	}

	// Fallback if test data lacks a completed todo
	return { ...testTodos[0], completed: true };
}

// Find the first incomplete todo (or return the first todo but set completed to false)
const getOneIncompletedTodo = (): Todo => {
	const incompletedTodo = testTodos.find(todo => !todo.completed);
	if (incompletedTodo) {
		return incompletedTodo;
	}

	// Fallback if test data lacks a incompleted todo
	return { ...testTodos[0], completed: false };
}

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
		const todo = testTodos[0];
		const ulEl = renderTodosToDOM([ todo ]);

		// query UL for any listitems with the `todo` class
		const liEls = ulEl.querySelectorAll("li.todo");
		expect(liEls).toHaveLength(1);

		// get the LI element
		const liEl = ulEl.querySelector<HTMLLIElement>("li.todo");
		expect(liEl).not.toBeNull();

		// make sure the id is correct
		expect(liEl!.dataset.todoId).toBe(String(todo.id));

		// make sure the title is correct
		const titleEl = liEl!.querySelector("span.todo-title");
		expect(titleEl).not.toBeNull();
		expect(titleEl!.textContent).toBe(todo.title);
	});

	it("should output list with many todo", () => {
		const ulEl = renderTodosToDOM(testTodos);

		const liEls = ulEl.querySelectorAll("li.todo");
		expect(liEls).toHaveLength(testTodos.length);
	});

	it("should output list with one completed todo", () => {
		const completedTodo = getOneCompletedTodo();
		const ulEl = renderTodosToDOM([ completedTodo ]);

		const liEls = ulEl.querySelectorAll("li.todo.completed");
		expect(liEls).toHaveLength(1);
	});

	it("should output list with one todo that isn't completed", () => {
		const incompletedTodo = getOneIncompletedTodo();
		const ulEl = renderTodosToDOM([ incompletedTodo ]);

		const liEls = ulEl.querySelectorAll("li.todo:not(.completed)");
		expect(liEls).toHaveLength(1);

		// alternative to using the `:not()` pseudo-class above
		// const liEl = ulEl.querySelector("li.todo")!;
		// expect(liEl.classList.contains("completed")).toBe(false);
	});
});
