import { useEffect, useState } from "react"
import { EntryCard } from "./EntryCard"
import { getUserEntries } from "../../api/entryManager"
import { getAllCategories } from "../../api/categoryManager"
import { FormControl, MenuItem, Select } from "@mui/material"

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
            <FormControl sx={{m: 1, minWidth: 120}} size="small">
            <Select fullWidth value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <MenuItem value={"All"}>All</MenuItem>
                {
                    categories?.map(category => <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>)
                }
            </Select>
            </FormControl>
            <h1>Entries</h1>
            <div className="entries">
                {
                    entries?.map(entry => <EntryCard key={entry.id} entry={entry} />)
                }
            </div>
        </>
    )
}