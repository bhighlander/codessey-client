import { useState } from "react"
import { updateCategory } from "../../api/categoryManager"
import { Box, Button, FormControl, TextField, Typography } from "@mui/material"

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
        <Box>
            <Typography variant="h6">Edit Category</Typography>
            <form className="form--category">
            <FormControl>
                <TextField
                    className="form-control"
                    id='label'
                    label="Label"
                    variant="outlined"
                    required
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
        </Box>
    )
}