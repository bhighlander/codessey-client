import { useEffect, useState } from "react"
import { addCategory, deleteCategory, getAllCategories } from "../../api/categoryManager"

export const CategoryList = ({ token }) => {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState({label: ""})

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


    return (
        <>
            <h2>Categories</h2>
            <div className="categories">
                {categories.map((category) => {
                    return <><h3 key={category.id}>{category.label}</h3>
            <button className="btn btn-primary" id={category.id} onClick={handleDeleteCategory}>X</button></> 
            // TODO change button to an icon
                })}
            </div>
            {/* add a category field */}
            <form className="form--category">
                <h2 className="form--category__title">Add a Category</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="label">Label:</label>
                        <input
                        type="text"
                        id="label" 
                        name="label" 
                        required 
                        autoFocus 
                        className="form-control" 
                        value={newCategory.label}
                        onChange={(e) => {
                            const copy = {...newCategory}
                            copy.label = e.target.value
                            setNewCategory(copy)
                        }}
                        />
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={handleAddCategory}>Save Category</button>
            </form>
        </>
    )
}