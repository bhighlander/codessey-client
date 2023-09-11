export const getCommentByEntryId = async (entryId, token) => {
    const response = await fetch(`http://localhost:8000/comments?entry=${entryId}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}

export const createComment = async (comment, token) => {
    const response = await fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    });
    return await response.json();
}

export const deleteComment = async (commentId, token) => {
    await fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
}