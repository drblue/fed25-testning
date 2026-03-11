import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { server } from "../mocks/server";
import * as TodoAPI from "../services/TodoAPI";
import type { TodoData } from "../types/Todo";

// 👂🏻 Before all tests, start listening for requests
beforeAll(() => {
	server.listen();
});

// 🧨 Reset handlers
afterEach(() => {
	server.resetHandlers();
});

// 🙉 After all tests, stop listening
afterAll(() => {
	server.close();
});

const newTodo: TodoData = { title: "Test todo", completed: false };

describe("TodoAPI", () => {

	it("should return a empty list", async () => {
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

	it("should create a todo and then get the todo", async () => {
		// create a new todo
		const createdTodo = await TodoAPI.createTodo(newTodo);

		// try to get the new todo
		const todo = await TodoAPI.getTodo(createdTodo.id);

		// assert that the retrieved todo looks like createdTodo
		/*
		// 😒
		expect(todo.id).toBe(createdTodo.id);
		expect(todo.title).toBe(createdTodo.title);
		expect(todo.completed).toBe(createdTodo.completed);
		*/

		/*
		// 😳
		expect(todo).toMatchObject({
			id: createdTodo.id,
			title: createdTodo.title,
			completed: createdTodo.completed,
		});
		expect(todo).toMatchObject(createdTodo);
		*/

		// expect both todos to have the same keys + values
		expect(todo).toStrictEqual(createdTodo);
	});

	it("should create a todo and find the todo among all todos", async () => {
		// create a new todo
		const createdTodo = await TodoAPI.createTodo(newTodo);

		// get all dem todos
		const todos = await TodoAPI.getTodos();

		// expect created todo to exist in the array of all todos
		/*
		const foundTodo = todos.find(todo => todo.id === createdTodo.id);
		expect(foundTodo).toStrictEqual(createdTodo);
		*/

		// expect(todos).toEqual( expect.arrayContaining([ createdTodo ]) );
		expect(todos).toContainEqual(createdTodo);
	});

	it("should create a todo and then update the todo", async () => {
		const createdTodo = await TodoAPI.createTodo(newTodo);

		const updatedTodo = await TodoAPI.updateTodo(createdTodo.id, {
			completed: !createdTodo.completed,
		});

		expect(updatedTodo).toStrictEqual({
			...createdTodo,
			completed: !createdTodo.completed,
		});
	});

	it("should create a todo and then delete the todo and verify that the todo was actually deleted", async () => {
		const createdTodo = await TodoAPI.createTodo(newTodo);

		await TodoAPI.deleteTodo(createdTodo.id);

		const todos = await TodoAPI.getTodos();

		expect(todos).not.toContainEqual(createdTodo);
	});

	it.skip("should throw an error when trying to get a todo that does not exist", async () => {
		// expect an error to be thrown
		await expect(
			TodoAPI.getTodo(99999)
		).rejects.toThrowError();
	});

});
