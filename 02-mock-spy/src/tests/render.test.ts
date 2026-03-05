/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";
import testTodos from "./data/todos";

describe("transform todos", () => {
	it("should output empty list when no todos exist", () => {
		const lis = transformTodosToHtml([]);
		expect(lis).toBe("");
	});

	it("should output list with one todo", () => {
		const lis = transformTodosToHtml([ testTodos[0] ]);
		document.body.innerHTML = `<ul id="#todos">${lis}</ul>`;

		// query dom for any listitems with the `todo` class
		const liEls = document.querySelectorAll("li.todo");
		expect(liEls).toHaveLength(1);
	});
});
