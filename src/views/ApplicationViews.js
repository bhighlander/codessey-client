import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EntriesList } from "../components/entries/ViewAllEntries"
import { CreateEntry } from "../components/forms/NewEntry"
import { EntryDetails } from "../components/entries/ViewEntryDetails"
import { CategoryList } from "../components/categories/ViewCategories"

export const ApplicationViews = ({ token, setToken }) => {

    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/entries" element={<EntriesList token={token} />} />
            <Route path="/entries/create" element={<CreateEntry token={token} />} />
            <Route path="/entries/:entryId" element={<EntryDetails token={token} />} />
            <Route path="/categories" element={<CategoryList token={token} />} />
        </Routes>
    )
}