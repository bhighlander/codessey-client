export const getEntries = async (token) => {
    const response = await fetch("http://localhost:8000/entries", {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}

export const deleteEntry = async (entryId, token) => {
    await fetch(`http://localhost:8000/entries/${entryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
}

export const getUserEntries = async (token, categoryId = null) => {
    let url = `http://localhost:8000/entries?user=true`;
    if (categoryId) {
        url += `&category=${categoryId}`;
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
        "Authorization": `Token ${token}`
        }
    });

    return await response.json();
    }  

export const getSingleEntry = async (entryId, token) => {
    const response = await fetch(`http://localhost:8000/entries/${entryId}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}

export const createEntry = async (entry, token) => {
    const response = await fetch("http://localhost:8000/entries", {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
    return await response.json();
}

export const addEntryCategory = async (entry_id, category_id, token) => {
    await fetch(`http://localhost:8000/entries/${entry_id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ category_add: category_id })
    });
}

export const removeEntryCategory = async (entry_id, category_id, token) => {
    await fetch(`http://localhost:8000/entries/${entry_id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ category_remove: category_id })
    });
}

export const updateEntry = async (entry, token) => {
    await fetch(`http://localhost:8000/entries/${entry.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
}