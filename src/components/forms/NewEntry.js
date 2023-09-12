import { useNavigate } from "react-router"
import { createEntry } from "../../api/entryManager"
import { useState } from "react"
import { TextField } from "@mui/material"
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
        <form className="entryForm" onSubmit={handleSubmitPost}>
            <h2 className="entryForm__title">New Entry</h2>
            <FormControl>
            <TextField
                className="form-control"
                id='title'
                label="Title"
                variant="outlined"
                required
                autoFocus
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
                multiline
                rows={4}
                required
                autoFocus
                onChange={(e) => {
                    const copy = { ...newPost }
                    copy.content = e.target.value
                    setNewPost(copy)
                }}
            />
            </FormControl>
            <Button variant="contained" className="btn btn-primary" type="submit">Save</Button>
        </form>
    )
}