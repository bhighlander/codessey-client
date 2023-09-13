import { useEffect, useState } from "react"
import { EntryCard } from "./EntryCard"
import { getUserEntries } from "../../api/entryManager"
import { getAllCategories } from "../../api/categoryManager"
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material"

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
        <Box className="all-entries" sx={{ display: "flex", flexDirection: "row"}}>
            <Box className="entries-list" sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>Entries</Typography>
                {
                    entries?.map(entry => <EntryCard key={entry.id} entry={entry} />)
                }
                </Box>
            <Box className="filter-categories" sx={{ display: "flex", flexDirection: "column", justifyContent: "right", alignItems: "center" }}>
            <Typography>Filter Entries</Typography>
            <FormControl sx={{m: 1, minWidth: 120}} size="small">
            <Select fullWidth value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <MenuItem value={"All"}>All</MenuItem>
                {
                    categories?.map(category => <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>)
                }
            </Select>
            </FormControl>
            </Box>
        </Box>
    )
}