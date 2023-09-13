import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleEntry, updateEntry } from "../../api/entryManager"
import { Button, TextField } from "@mui/material"
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
        <form className="entryForm" onSubmit={handleUpdate}>
            <h2 className="entryForm__title">Edit Entry</h2>
            <FormControl>
            <TextField
                className="form-control"
                id='title'
                label="Title"
                variant="outlined"
                required
                autoFocus
                InputLabelProps={{ shrink: true }}
                value={entry.title}
                onChange={(e) => {
                    const copy = { ...entry }
                    copy.title = e.target.value
                    setEntry(copy)
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
                InputLabelProps={{ shrink: true }}
                value={entry.content}
                onChange={(e) => {
                    const copy = { ...entry }
                    copy.content = e.target.value
                    setEntry(copy)
                }}
            />
            </FormControl>
            <Button variant="contained" className="btn btn-primary" type="submit">Save</Button>
        </form>
    )
}