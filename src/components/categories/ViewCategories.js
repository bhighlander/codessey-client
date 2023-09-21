import { useEffect, useState } from "react"
import { addCategory, deleteCategory, getAllCategories } from "../../api/categoryManager"
import { EditCategory } from "../forms/EditCategory"
import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export const CategoryList = ({ token }) => {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState({label: ""})
    const [editedCategory, setEditedCategory] = useState(null)

    const handleDeleteCategory = (e, categoryId) => { // TODO add mui confirmation modal
        e.preventDefault()
        deleteCategory(categoryId, token)
            .then(() => {
                getCategories()
            })
    }

    const getCategories = () => {
        getAllCategories(token)
            .then((categories) => {
                setCategories(categories)
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleAddCategory = (e) => {
        e.preventDefault()
        addCategory(newCategory, token)
            .then(() => {
                getCategories()
            })
            newCategory.label = ""
    }

    const toggleEdit = (id) => {
        if (editedCategory === id) {
            setEditedCategory(null)
        } else {
            setEditedCategory(id)
        }
    }

    return (
        <Box sx={{ margin: 2, maxWidth: '100%', overflowX: 'hidden' }}>
            <Typography variant="h5">Categories</Typography>
            <Grid container spacing={6} sx={{ margin: 0, maxWidth: '100%', overflowX: 'hidden' }}>
                {categories?.length > 0 ? (
                    categories.map((category) => (
                        <Grid item key={category.id} xs={2}>
                            <Typography variant="button" onClick={() => toggleEdit(category.id)}>{category.label}</Typography>
                            <br />
                            <IconButton aria-label="Delete" onClick={(e) => handleDeleteCategory(e, category.id)}>
                            <HighlightOffOutlinedIcon />
                            </IconButton>
                            <div className="editCategory">
                                {editedCategory === category.id && (
                                    <>
                                        <EditCategory token={token} getCategories={getCategories} category={category} onSave={() => setEditedCategory(null)} />
                                        <div>
                                            <Button onClick={() => setEditedCategory(null)}>Cancel</Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="button">No Categories. Please Add One.</Typography>
                )}
            </Grid>
            <form className="form--category">
            <Typography className="form--category__title">Add a Category</Typography>
            <TextField
                className="form-control"
                id='label'
                label="Label"
                variant="outlined"
                required
                value={newCategory.label}
                onChange={(e) => {
                    const copy = {...newCategory}
                    copy.label = e.target.value
                    setNewCategory(copy)
                }}
            />
            <Grid container justify="flex-start" style={{ marginTop: '10px' }}>
                <Grid item>
                    <Button variant="contained" onClick={handleAddCategory}>Save Category</Button>
                </Grid>
            </Grid>
        </form>
    </Box>
);

    
}