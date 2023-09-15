import { useNavigate } from "react-router"
import { createEntry } from "../../api/entryManager"
import { useState } from "react"
import { Box, Container, Grid, TextField, Typography } from "@mui/material"
import { FormControl } from "@mui/base"
import { Button } from "@mui/material"

export const CreateEntry = ({ token }) => {
    const navigate = useNavigate()
    const [newPost, setNewPost] = useState({
        title: "",
        content: ""
    })

    const handleSubmitPost = (e) => {
        e.preventDefault()

        createEntry(newPost, token)
            .then(() => {
                navigate("/entries")
            })
    }

    return (
    <Container>
        <Grid container
            spacing={2}
            sx={{ margin: .5 }}
            direction={'column'}
            justifyContent={"center"}
        >
        <form className="entryForm" onSubmit={handleSubmitPost}>
            <Grid item>
            <Typography className="entryForm__title">New Entry</Typography>
            </Grid>
            <Grid item>
            <FormControl>
            <TextField
                className="form-control"
                id='title'
                label="Title"
                variant="outlined"
                margin="normal"
                required
                onChange={(e) => {
                    const copy = { ...newPost }
                    copy.title = e.target.value
                    setNewPost(copy)
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
                margin="normal"
                multiline
                rows={6}
                maxRows={6}
                required
                onChange={(e) => {
                    const copy = { ...newPost }
                    copy.content = e.target.value
                    setNewPost(copy)
                }}
            />
            </FormControl>
            </Grid>
            <Grid item>
            <Button variant="contained" className="btn btn-primary" type="submit">Save</Button>
            </Grid>
        </form>
        </Grid>
    </Container>
    )
}