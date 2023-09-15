import { Button, Container, FormControl, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleComment, updateComment } from "../../api/commentManager"

export const EditComment = ({ token }) => {
    const { commentId } = useParams()
    const navigate = useNavigate()
    const [comment, setComment] = useState({title: "", content: "", entry: ""})

    const handleUpdateComment = (e) => {
        e.preventDefault()

        updateComment(comment, token)
            .then(() => {
                navigate(`/entries/${comment.entry}`)
            })
    }

    useEffect(() => {
        getSingleComment(commentId, token)
            .then(setComment)
    }
    , [commentId, token])

    return (
        <Container>
            <Grid container
            spacing={2}
            sx={{ margin: .5 }}
            direction={'column'}
            justifyContent={"center"}
        >
            <form className="commentForm" onSubmit={handleUpdateComment}>
                <Grid item>
                <Typography className="commentForm__title">Edit Comment</Typography>
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
                        value={comment.title}
                        onChange={(e) => {
                            const copy = { ...comment }
                            copy.title = e.target.value
                            setComment(copy)
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
                        InputLabelProps={{ shrink: true }}
                        value={comment.content}
                        onChange={(e) => {
                            const copy = { ...comment }
                            copy.content = e.target.value
                            setComment(copy)
                        }}
                    />
                </FormControl>
                </Grid>
                <Grid item>
                <Button type="submit" variant="contained">Update Comment</Button>
                </Grid>
            </form>
            </Grid>
        </Container>
    )
    }