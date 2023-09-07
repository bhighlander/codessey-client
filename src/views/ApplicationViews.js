import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EntriesList } from "../components/entries/ViewAllEntries"

export const ApplicationViews = ({ token, setToken }) => {

    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/entries" element={<EntriesList token={token} />} />
        </Routes>
    )
}