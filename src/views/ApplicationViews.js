import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EntriesList } from "../components/entries/ViewAllEntries"
import { CreateEntry } from "../components/forms/NewEntry"
import { EntryDetails } from "../components/entries/ViewEntryDetails"
import { CategoryList } from "../components/categories/ViewCategories"
import { CreateComment } from "../components/forms/NewComment"

export const ApplicationViews = ({ token, setToken }) => {

    return (
    <>
    <Routes>
        <Route>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            </Route>
        <Route path="/entries">
            <Route index element={<EntriesList token={token} />} />
            <Route path="create" element={<CreateEntry token={token} />} />
            <Route path=":entryId" element={<EntryDetails token={token} />} />
        </Route>
        <Route path="/categories">
            <Route index element={<CategoryList token={token} />} />
        </Route>
        <Route path="/comments">
            <Route path="create/:entryId" element={<CreateComment token={token} />} />
        </Route>
    </Routes>
    </>
    )
}