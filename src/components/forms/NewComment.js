import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createComment } from "../../api/commentManager"
import { FormControl } from "@mui/base"
import { Button, Container, Grid, TextField, Typography } from "@mui/material"

export const CreateComment = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [newComment, setNewComment] = useState({
        title: "",
        content: "",
        entry: entryId
    })

    const handleSubmitComment = (e) => {
        e.preventDefault()

        createComment(newComment, token)
            .then(() => {
                navigate(`/entries/${entryId}`)
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
        <form className="commentForm" onSubmit={handleSubmitComment}>
            <Grid item>
            <Typography className="commentForm__title">New Comment</Typography>
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
                        const copy = { ...newComment }
                        copy.title = e.target.value
                        setNewComment(copy)
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
                    rows={4}
                    required
                    onChange={(e) => {
                        const copy = { ...newComment }
                        copy.content = e.target.value
                        setNewComment(copy)
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