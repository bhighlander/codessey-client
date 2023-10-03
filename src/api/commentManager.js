export const getCommentByEntryId = async (entryId, token) => {
    const response = await fetch(`https://clownfish-app-3qbai.ondigitalocean.app/comments?entry=${entryId}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}

export const createComment = async (comment, token) => {
    const response = await fetch("https://clownfish-app-3qbai.ondigitalocean.app/comments", {
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
    await fetch(`https://clownfish-app-3qbai.ondigitalocean.app/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
}

export const updateComment = async (comment, token) => {
    await fetch(`https://clownfish-app-3qbai.ondigitalocean.app/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    });
}

export const getSingleComment = async (commentId, token) => {
    const response = await fetch(`https://clownfish-app-3qbai.ondigitalocean.app/comments/${commentId}`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return await response.json();
}