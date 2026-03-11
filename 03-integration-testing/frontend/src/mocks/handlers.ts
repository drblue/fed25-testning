import { http, HttpResponse } from "msw";
import type { Todo } from "../types/Todo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const dummyTodos: Todo[] = [
	{ id: 1, title: "My first todo", completed: false },
	{ id: 2, title: "My second todo", completed: true },
	{ id: 3, title: "My third todo", completed: false },
];

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

	// Mock update todo
	// PATCH http://localhost:3001/todos/:todoId

	// Mock delete todo
	// DELETE http://localhost:3001/todos/:todoId
];
