import { apiUrl } from "../utils/apiConfig";

export const getTodos = async (token) => {
    const response = await fetch(`${apiUrl}/todos`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}

export const addTodo = async (todo, token) => {
    const response = await fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });
    return await response.json();
}

export const deleteTodo = async (todoId, token) => {
    await fetch(`${apiUrl}/todos/${todoId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
}

export const updateTodo = async (todo, token) => {
    await fetch(`${apiUrl}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });
}
