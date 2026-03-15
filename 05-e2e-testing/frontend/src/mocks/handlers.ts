import { http, HttpResponse, type PathParams } from "msw";
import type { Todo, TodoData } from "../types/Todo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const dummyTodos: Todo[] = [
	{ id: 1, title: "My first todo", completed: false },
	{ id: 2, title: "My second todo", completed: true },
	{ id: 3, title: "My third todo", completed: false },
];

type CreateTodoRequestBody = TodoData;
type UpdateTodoRequestBody = Partial<TodoData>;
type TodoParams = {
	todoId: string;
}

// Array containing all our request handlers
export const handlers = [
	// Mock get all todos
	// GET http://localhost:3001/todos
	http.get(BASE_URL + "/todos", () => {
		console.log("👮‍ Intercepted GET /todos");
		return HttpResponse.json(dummyTodos);
	}),

	// Mock get single todo
	// GET http://localhost:3001/todos/:todoId
	http.get<TodoParams>(BASE_URL + "/todos/:todoId", ({ params }) => {
		// Get the todo ID from the request parameters
		const todoId = Number(params.todoId);

		// Check if a todo with that ID exists
		const todo = dummyTodos.find(todo => todo.id === todoId);

		// If not, respond with empty object and HTTP 404 Not Found
		if (!todo) {
			return HttpResponse.json({}, { status: 404 });
		}

		// Otherwise, respond with the todo with the corresponding ID
		return HttpResponse.json(todo);
	}),

	// Mock create todo
	// POST http://localhost:3001/todos
	http.post<PathParams, CreateTodoRequestBody>(BASE_URL + "/todos", async ({ request }) => {
		// Get POST body
		const payload = await request.json();  // { "title": "🐎 Jak er snab hest", "completed": true }
		if (!payload.title || typeof payload.completed === "undefined") {
			return HttpResponse.json({}, { status: 400 });
		}

		// Find next available id
		// const id = dummyTodos.reduce((maxId, todo) => todo.id > maxId ? todo.id : maxId, 0) + 1;
		const id = Math.max(0, ...dummyTodos.map(todo => todo.id) ) + 1;

		// Create todo
		const todo: Todo = {
			id,
			...payload,
		}

		// Add the new todo to our list of todos
		dummyTodos.push(todo);

		// Respond with the created todo
		return HttpResponse.json(todo);
	}),

	// Mock update todo
	// PATCH http://localhost:3001/todos/:todoId
	http.patch<TodoParams, UpdateTodoRequestBody>(BASE_URL + "/todos/:todoId", async ({ params, request }) => {
		// Get the todo ID from the request
		const todoId = Number(params.todoId);

		// Get PATCH body
		const payload = await request.json();

		// Check if a todo with that ID exists
		const todo = dummyTodos.find(todo => todo.id === todoId);

		// If not, respond with empty object and HTTP 404 Not Found
		if (!todo) {
			return HttpResponse.json({}, { status: 404 });
		}

		// Update todo with payload
		// todo.title = payload.title ? payload.title : todo.title;
		todo.title = payload.title ?? todo.title;
		todo.completed = payload.completed ?? todo.completed;

		// Respond with updated todo
		return HttpResponse.json(todo);
	}),

	// Mock delete todo
	// DELETE http://localhost:3001/todos/:todoId
	http.delete<TodoParams>(BASE_URL + "/todos/:todoId", ({ params }) => {
		// Get the todo ID from the request
		const todoId = Number(params.todoId);

		// Find index of todo with that ID
		const todoIndex = dummyTodos.findIndex(todo => todo.id === todoId);

		// If todo could not be found, respond with empty object and HTTP 404 Not Found
		if (todoIndex === -1) {
			// This is not the todo you're looking for
			return HttpResponse.json({}, { status: 404 });
		}

		// Remove todo from array
		dummyTodos.splice(todoIndex, 1);

		// Respond with empty object
		return HttpResponse.json({});
	}),
];
