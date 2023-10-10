import { apiUrl } from "../utils/apiConfig";

export const getAllCategories = async (token) => {
    const response = await fetch(`${apiUrl}/categories`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}

export const addCategory = async (category, token) => {
    const response = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });
    return await response.json();
}

export const deleteCategory = async (categoryId, token) => {
    await fetch(`${apiUrl}/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
}

export const getCategoriesByEntryId = async (entryId, token) => {
    const response = await fetch(`${apiUrl}/categories?entry=${entryId}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}

export const updateCategory = async (category, token) => {
    await fetch(`${apiUrl}/categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });
}