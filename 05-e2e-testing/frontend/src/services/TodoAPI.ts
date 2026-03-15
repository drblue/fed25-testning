import axios from "axios";
import type { Todo, TodoData } from "../types/Todo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/**
 * Generic get request
 */
export const get = async <T>(endpoint: string) => {
	const res = await axios.get<T>(BASE_URL + endpoint);
	return res.data;
};

/**
 * Generic post request with typing of both data and response without having to use `any`
 */
export const post = async <Payload, Response>(endpoint: string, data: Payload) => {
	const res = await axios.post<Response>(BASE_URL + endpoint, data);
	return res.data;
};

/**
 * Generic patch request
 */
export const patch = async <Payload, Response>(endpoint: string, data: Payload) => {
	const res = await axios.patch<Response>(BASE_URL + endpoint, data);
	return res.data;
};

/**
 * Generic delete request
 */
export const del = async <T>(endpoint: string) => {
	const res = await axios.delete<T>(BASE_URL + endpoint);
	return res.data;
};

/**
 * Get all todos
 */
export const getTodos = () => {
	return get<Todo[]>("/todos");
};

/**
 * Get a single todo
 */
export const getTodo = (id: number) => {
	return get<Todo>(`/todos/${id}`);
};

/**
 * Create a new todo
 */
export const createTodo = (todo: TodoData) => {
	return post<TodoData, Todo>(`/todos`, todo);
};

/**
 * Update a todo
 */
export const updateTodo = (id: number, todo: Partial<TodoData>) => {
	return patch<typeof todo, Todo>(`/todos/${id}`, todo);
};

/**
 * Delete a todo
 */
export const deleteTodo = (id: number) => {
	return del(`/todos/${id}`);
};
