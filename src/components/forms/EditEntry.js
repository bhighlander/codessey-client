import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleEntry, updateEntry } from "../../api/entryManager"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { FormControl } from "@mui/base"

export const EditEntry = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [entry, setEntry] = useState({title: "", content: ""})

    const handleUpdate = (e) => {
        e.preventDefault()

        updateEntry(entry, token)
            .then(() => {
                navigate(`/entries/${entryId}`)
            })
    }

    useEffect(() => {
        getSingleEntry(entryId, token)
            .then(setEntry)
    }
    , [entryId, token])

    return (
    <Container>
            <Grid container
            spacing={2}
            sx={{ margin: .5 }}
            direction={'column'}
            justifyContent={"center"}
        >
        <form className="entryForm" onSubmit={handleUpdate}>
            <Grid item>
            <Typography variant="h6" className="entryForm__title">Edit Entry</Typography>
            </Grid>
            <Grid item>
            <FormControl>
            <TextField
                className="form-control"
                id='title'
                label="Title"
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
                value={entry.title}
                onChange={(e) => {
                    const copy = { ...entry }
                    copy.title = e.target.value
                    setEntry(copy)
                }}
            />
            </FormControl>
            </Grid>
            <Grid item>
            <FormControl>
            <TextField
                className="form-control"
                id='content'
                label="Content"
                variant="outlined"
                multiline
                rows={6}
                maxRows={6}
                required
                InputLabelProps={{ shrink: true }}
                value={entry.content}
                onChange={(e) => {
                    const copy = { ...entry }
                    copy.content = e.target.value
                    setEntry(copy)
                }}
            />
            </FormControl>
            </Grid>
            <Grid container spacing={2}>
            <Grid item>
            <Button variant="contained" className="btn btn-primary" type="submit">Save</Button>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={() => {navigate(`/entries/${entryId}`)}}>Cancel</Button>
            </Grid>
            </Grid>
        </form>
        </Grid>
    </Container>
    )
}