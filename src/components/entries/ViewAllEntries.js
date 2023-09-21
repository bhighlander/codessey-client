import { useEffect, useState } from "react"
import { EntryCard } from "./EntryCard"
import { getUserEntries } from "../../api/entryManager"
import { getAllCategories } from "../../api/categoryManager"
import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material"

export const EntriesList = ({ token }) => {
    const [entries, setEntries] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")

    useEffect(() => {
        getAllCategories(token)
            .then(setCategories)
    }, [token])

    useEffect(() => {
        getUserEntries(token, selectedCategory)
            .then(setEntries)
    }, [token, selectedCategory])

    return (
        <Grid container spacing={6} sx={{ margin: 0, maxWidth: '100%', overflowX: 'hidden' }}>
            <Grid item style={{ width: '50%' }}>
                <Box className="entries-list">
                    <Typography variant="h5">Entries</Typography>
                    {
                        entries?.map(entry => <EntryCard key={entry.id} entry={entry} />)
                    }
                </Box>
            </Grid>
            <Grid item style={{ width: '30%' }}>
                <Box className="filter-categories">
                    <Typography variant="h5">Filter Entries</Typography>
                    <FormControl sx={{m: 1, minWidth: 120}} size="small">
                        <Select fullWidth value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <MenuItem value={"All"}>All</MenuItem>
                            {
                                categories?.map(category => <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        </Grid>
    );
}