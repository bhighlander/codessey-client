import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { EntriesList } from "../components/entries/ViewAllEntries"
import { CreateEntry } from "../components/forms/NewEntry"
import { EntryDetails } from "../components/entries/ViewEntryDetails"
import { CategoryList } from "../components/categories/ViewCategories"
import { CreateComment } from "../components/forms/NewComment"
import { EditEntry } from "../components/forms/EditEntry"
import { EditComment } from "../components/forms/EditComment"
import { useEffect } from "react"

export const ApplicationViews = ({ token, setToken }) => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!token && location.pathname !== '/login' && location.pathname !== '/register') {
            navigate("/login");
        }
    }, [token, navigate, location]);

    if (!token) {
        return (
            <>
            <Routes>
                <Route>
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register setToken={setToken} />} />
                </Route>
            </Routes>
            </>
        )
        
    } else {
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
            <Route path="edit/:entryId" element={<EditEntry token={token} />} />
        </Route>
        <Route path="/categories">
            <Route index element={<CategoryList token={token} />} />
        </Route>
        <Route path="/comments">
            <Route path="create/:entryId" element={<CreateComment token={token} />} />
            <Route path="edit/:commentId" element={<EditComment token={token} />} />
        </Route>
    </Routes>
    </>
    )
    }
}