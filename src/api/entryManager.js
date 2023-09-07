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
    const response = await fetch(`http://localhost:8000/entries/${entryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}

export const getUserEntries = async (token) => {
    const response = await fetch(`http://localhost:8000/entries?user=true`, {
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