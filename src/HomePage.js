import { useEffect, useState } from "react"
import { getUnsolvedEntries } from "./api/entryManager"
import { Box, Grid, Typography } from "@mui/material"
import { EntryCard } from "./components/entries/EntryCard"
import { TodoList } from "./components/Todo/TodoList"

export const UserHome = ({ token }) => {
    const [unsolvedEntries, setUnsolvedEntries] = useState([])

    useEffect(() => {
        getUnsolvedEntries(token)
            .then(setUnsolvedEntries)
    }
    , [token])

    return (
        <Grid container spacing={8} sx={{ margin: .5 }}>
            <Grid item style={{ width: '50%' }}>
                <Box className="entries-list">
                    <Typography variant="h5">Entries I'm Working On</Typography>
                    {
                        unsolvedEntries?.map(entry => <EntryCard key={entry.id} entry={entry} />)
                    }
                </Box>
            </Grid>
            <Grid item style={{ width: '30%' }}>
                <TodoList token={token} />
                </Grid>
            </Grid>
    )

}