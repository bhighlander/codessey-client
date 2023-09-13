import { useEffect, useState } from "react"
import { addCategory, deleteCategory, getAllCategories } from "../../api/categoryManager"
import { EditCategory } from "../forms/EditCategory"
import { Box, Button, TextField, Typography } from "@mui/material"
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
        <Box>
            <Typography>Categories</Typography>
            <div className="categories">
                {categories?.map((category) => {
                    return <div key={category.id}><Typography key={category.id} onClick={() => toggleEdit(category.id)}>{category.label}</Typography>
            <HighlightOffOutlinedIcon onClick={(e) => handleDeleteCategory(e, category.id)} />
            <div className="editCategory">
                {editedCategory === category.id && (
                    <><EditCategory token={token} getCategories={getCategories} category={category} onSave={() => setEditedCategory(null)} />
                    <div>
                        <Button onClick={() => setEditedCategory(null)}>Cancel</Button>
                    </div></>
                
                )
                }
            </div>
            </div>
                })}
            </div>
            {/* add a category field */}
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
                <Button variant="contained" onClick={handleAddCategory}>Save Category</Button>
            </form>
        </Box>
    )
}