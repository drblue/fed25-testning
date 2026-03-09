import { describe, expect, it } from "vitest";
import * as TodoAPI from "../services/TodoAPI";

describe("TodoAPI", () => {

	it("should return a list", async () => {
		const todos = await TodoAPI.getTodos();

		expect( Array.isArray(todos) ).toBe(true);
	});

	it.todo("should create a todo", () => {});

	it.todo("should create a todo and then get the todo", () => {});

	it.todo("should create a todo and find the todo among all todos", () => {});

	it.todo("should create a todo and then update the todo", () => {});

	it.todo("should create a todo and then delete the todo and verify that the todo was actually deleted", () => {});

	it.todo("should throw an error when trying to get a todo that does not exist", () => {});

});
