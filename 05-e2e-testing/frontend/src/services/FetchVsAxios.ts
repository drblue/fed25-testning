/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * THIS IS NOT IN USE AND ONLY FOR DEMONSTRATING
 * THE DIFFERENCE BETWEEN fetch AND axios
 */
import axios from "axios";
import type { Todo, TodoData } from "../types/Todo";

const newTodo: TodoData = { title: "My new Todo", completed: false }

const get = async <T>(url: string) => {
	const res = await axios.get<T>(url);
	return res.data;
}

const getTodos = () => {
	return get<Todo[]>("http://localhost:3001/todos");
}

const post = async <ResponseType, PayloadType>(url: string, payload: PayloadType) => {
	const res = await axios.post<ResponseType>(url, payload);
	return res.data;
}

const createTodo = (data: TodoData) => {
	return post<Todo, TodoData>("http://localhost:3001/todos", data);
}

// const res = await createTodo(newTodo);
// //    ^?

const fetchGet = async <T>(url: string) => {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("I'm not 🆗");
	}

	const data = await res.json() as T;
 //     ^?

	return data;
}

// const todos = await fetchGet<Todo[]>("http://localhost:3001/todos");
// //     ^?

const fetchPost = async <ResponseType, PayloadType>(url: string, payload: PayloadType) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		throw new Error("I'm not 🆗");
	}

	const data = await res.json() as ResponseType;
 //     ^?

	return data;
}

// const res = await fetchPost<Todo, TodoData>("http://localhost:3001/todos", newTodo)
// //    ^?
