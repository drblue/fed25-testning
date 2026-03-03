import type { Todo } from "../types/Todo";

/**
 * Render an HTML-string to an HTML element
 *
 * @param element
 * @param html
 */
export const render = (element: HTMLElement, html: string) => {
	element.innerHTML = html;
};

/**
 * Render an array of Todo-objects to the DOM
 *
 * @param todos
 */
export const renderTodos = (todos: Todo[]) => {
	render(
		document.querySelector<HTMLUListElement>("#todos")!,
		transformTodosToHtml(todos)
	);
};

/**
 * Transform an array of Todo-objects to an HTML-string
 *
 * @param todos
 * @returns
 */
export const transformTodosToHtml = (todos: Todo[]) => {
	return todos
		.map((todo) =>
			`<li class="list-group-item todo ${todo.completed ? 'completed' : ''}" data-todo-id="${todo.id}">
				<span class="todo-title">${todo.title}</span>
				${todo.completed
					? '<span class="delete-todo" role="button" title="Delete todo">🗑️</span>'
					: ''
				}
			</li>`
		)
		.join("");
};
