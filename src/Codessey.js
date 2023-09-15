import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/Navbar"

export const Codessey = () => {
    const [token, setToken] = useState(localStorage.getItem("auth_token"))

    const setNewToken = (newToken) => {
        localStorage.setItem("auth_token", newToken)
        setToken(newToken)
    }

    return (
        <>

        <NavBar token={token} setToken={setNewToken} />
        <ApplicationViews token={token} setToken={setNewToken} />

        </>
    )
}