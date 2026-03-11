import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// Array containing all our request handlers
export const handlers = [
	// Mock get all todos
	// GET http://localhost:3001/todos
	http.get(BASE_URL + "/todos", () => {
		console.log("👮‍ Intercepted GET /todos");
		return HttpResponse.json([]);
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
