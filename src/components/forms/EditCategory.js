import { useState } from "react"
import { updateCategory } from "../../api/categoryManager"

export const EditCategory = ({ token, category, getCategories }) => {
    const [editedCategory, setEditedCategory] = useState({id: category.id, label: category.label})

    const handleEditCategory = (e) => {
        e.preventDefault()
        updateCategory(editedCategory, token)
            .then(() => {
                getCategories()
            })
    }

    return (
        <>
            <h2>Edit Category</h2>
            <form className="form--category">
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
                        value={editedCategory.label}
                        onChange={(e) => {
                            const copy = {...editedCategory}
                            copy.label = e.target.value
                            setEditedCategory(copy)
                        }}
                        />
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={handleEditCategory}>Save</button>
            </form>
        </>
    )
}