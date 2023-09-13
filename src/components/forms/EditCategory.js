import { useState } from "react"
import { updateCategory } from "../../api/categoryManager"
import { Button, FormControl, TextField } from "@mui/material"

export const EditCategory = ({ token, category, getCategories, onSave }) => {
    const [editedCategory, setEditedCategory] = useState({id: category.id, label: category.label})

    const handleEditCategory = (e) => {
        e.preventDefault()
        updateCategory(editedCategory, token)
            .then(() => {
                getCategories()
                onSave()
            })
    }

    return (
        <>
            <h2>Edit Category</h2>
            <form className="form--category">
            <FormControl>
                <TextField
                    className="form-control"
                    id='label'
                    label="Label"
                    variant="outlined"
                    required
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    value={editedCategory.label}
                    onChange={(e) => {
                        const copy = { ...editedCategory }
                        copy.label = e.target.value
                        setEditedCategory(copy)
                    }}
                />
            </FormControl>
                <Button variant="contained" className="btn btn-primary" onClick={handleEditCategory}>Save</Button>
            </form>
        </>
    )
}