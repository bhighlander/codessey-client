import { useNavigate } from "react-router"
import { createEntry } from "../../api/entryManager"
import { useState } from "react"
import { Box, TextField, Typography } from "@mui/material"
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
    <Box>
        <form className="entryForm" onSubmit={handleSubmitPost}>
            <Typography className="entryForm__title">New Entry</Typography>
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
            <Button variant="contained" className="btn btn-primary" type="submit">Save</Button>
        </form>
    </Box>
    )
}