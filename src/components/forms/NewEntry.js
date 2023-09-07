import { useNavigate } from "react-router"
import { createEntry } from "../../api/entryManager"
import { useState } from "react"

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
            <fieldset>
                <label htmlFor="title">Title:</label>
                <input
                    onChange={
                        (evt) => {
                            const copy = { ...newPost }
                            copy.title = evt.target.value
                            setNewPost(copy)
                        }
                    }
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Title"
                />
            </fieldset>
            <fieldset>
                <label htmlFor="content">Content:</label>
                <textarea
                    onChange={
                        (evt) => {
                            const copy = { ...newPost }
                            copy.content = evt.target.value
                            setNewPost(copy)
                        }
                    }
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Content"
                />
            </fieldset>
            <fieldset>
                <button type="submit">
                    Save Entry
                </button>
            </fieldset>
        </form>
    )
}