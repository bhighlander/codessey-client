import { useEffect, useState } from "react"
import { addCategory, deleteCategory, getAllCategories } from "../../api/categoryManager"
import { EditCategory } from "../forms/EditCategory"
import { Button, TextField } from "@mui/material"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export const CategoryList = ({ token }) => {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState({label: ""})
    const [editedCategory, setEditedCategory] = useState(null)

    const handleDeleteCategory = (e) => { // TODO add mui confirmation modal
        e.preventDefault()
        deleteCategory(e.target.id, token)
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
        <>
            <h2>Categories</h2>
            <div className="categories">
                {categories?.map((category) => {
                    return <><h3 onClick={() => toggleEdit(category.id)}>{category.label}</h3>
            <HighlightOffOutlinedIcon id={category.id} onClick={handleDeleteCategory} />
            <div className="editCategory">
                {editedCategory === category.id && (
                    <><EditCategory token={token} getCategories={getCategories} category={category} onSave={() => setEditedCategory(null)} />
                    <div>
                        <button onClick={() => setEditedCategory(null)}>Cancel</button>
                    </div></>
                
                )
                }
            </div>
            </>
                })}
            </div>
            {/* add a category field */}
            <form className="form--category">
                <h2 className="form--category__title">Add a Category</h2>
                <TextField
                    className="form-control"
                    id='label'
                    label="Label"
                    variant="outlined"
                    required
                    autoFocus
                    value={newCategory.label}
                    onChange={(e) => {
                        const copy = {...newCategory}
                        copy.label = e.target.value
                        setNewCategory(copy)
                    }}
                />
                <Button variant="contained" onClick={handleAddCategory}>Save Category</Button>
            </form>
        </>
    )
}