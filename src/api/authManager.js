export const registerUser = async (newUser) => {
    const response = await fetch("https://clownfish-app-3qbai.ondigitalocean.app/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });
    return await response.json();
}

export const loginUser = async (user) => {
    const response = await fetch("https://clownfish-app-3qbai.ondigitalocean.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username: user.username, password: user.password})
    });
    return await response.json();
}