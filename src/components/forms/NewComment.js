import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createComment } from "../../api/commentManager"
import { FormControl } from "@mui/base"
import { Button, TextField } from "@mui/material"

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
        <form className="commentForm" onSubmit={handleSubmitComment}>
            <h2 className="commentForm__title">New Comment</h2>
            <FormControl>
                <TextField
                    className="form-control"
                    id='title'
                    label="Title"
                    variant="outlined"
                    required
                    autoFocus
                    onChange={(e) => {
                        const copy = { ...newComment }
                        copy.title = e.target.value
                        setNewComment(copy)
                    }}
                />
            </FormControl>
            <FormControl>
                <TextField
                    className="form-control"
                    id='content'
                    label="Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    autoFocus
                    onChange={(e) => {
                        const copy = { ...newComment }
                        copy.content = e.target.value
                        setNewComment(copy)
                    }}
                />
            </FormControl>
            <Button variant="contained" className="btn btn-primary" type="submit">Save</Button>
        </form>
    )
}