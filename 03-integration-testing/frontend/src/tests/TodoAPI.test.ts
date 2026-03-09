import { describe, expect, it } from "vitest";
import * as TodoAPI from "../services/TodoAPI";
import type { TodoData } from "../types/Todo";

const newTodo: TodoData = { title: "Test todo", completed: false };

describe("TodoAPI", () => {

	it("should return a list", async () => {
		const todos = await TodoAPI.getTodos();

		expect( Array.isArray(todos) ).toBe(true);
	});

	it("should create a todo", async () => {
		const createdTodo = await TodoAPI.createTodo(newTodo);

		/*
		// expect(typeof createdTodo.id).toBe("number");  // 😑
		expect(createdTodo.id).toBeTypeOf("number");  // 🫤
		expect(createdTodo.title).toBe(newTodo.title);
		expect(createdTodo.completed).toBe(newTodo.completed);
		*/

		expect(createdTodo).toMatchObject({
			id: expect.any(Number),
			title: newTodo.title,
			completed: newTodo.completed,
		});
	});

	it.todo("should create a todo and then get the todo", () => {});

	it.todo("should create a todo and find the todo among all todos", () => {});

	it.todo("should create a todo and then update the todo", () => {});

	it.todo("should create a todo and then delete the todo and verify that the todo was actually deleted", () => {});

	it.todo("should throw an error when trying to get a todo that does not exist", () => {});

});
