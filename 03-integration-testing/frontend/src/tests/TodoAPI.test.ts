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

	it.todo("should create a todo and then update the todo", () => {});

	it.todo("should create a todo and then delete the todo and verify that the todo was actually deleted", () => {});

	it.todo("should throw an error when trying to get a todo that does not exist", () => {});

});
