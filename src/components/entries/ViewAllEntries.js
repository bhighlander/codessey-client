import { useEffect, useState } from "react"
import { EntryCard } from "./EntryCard"
import { getUserEntries } from "../../api/entryManager"
import { getAllCategories } from "../../api/categoryManager"

export const EntriesList = ({ token }) => {
    const [entries, setEntries] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])

    useEffect(() => {
        getAllCategories(token)
            .then(setCategories)
    }, [token])

    useEffect(() => {
        getUserEntries(token, selectedCategory)
            .then(setEntries)
    }, [token, selectedCategory])

    return (
        <>
            <h2>Filter Entries</h2>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value={null}>All</option>
                {
                    categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)
                }
            </select>
            <h1>Entries</h1>
            <div className="entries">
                {
                    entries.map(entry => <EntryCard key={entry.id} entry={entry} />)
                }
            </div>
        </>
    )
}