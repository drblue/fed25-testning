import { http, HttpResponse, type PathParams } from "msw";
import type { Todo, TodoData } from "../types/Todo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const dummyTodos: Todo[] = [
	{ id: 1, title: "My first todo", completed: false },
	{ id: 2, title: "My second todo", completed: true },
	{ id: 3, title: "My third todo", completed: false },
];

type CreateTodoRequestBody = TodoData;

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

	// Mock delete todo
	// DELETE http://localhost:3001/todos/:todoId
];
