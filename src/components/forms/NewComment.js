import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createComment } from "../../api/commentManager"

export const CreateComment = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [newComment, setNewComment] = useState({
        title: "",
        content: "",
        entry: entryId
    })

    const handleSubmitComment = (e) => {
        e.preventDefault()

        createComment(newComment, token)
            .then(() => {
                navigate(`/entries/${entryId}`)
            })
    }

    return (
        <form className="commentForm" onSubmit={handleSubmitComment}>
            <h2 className="commentForm__title">New Comment</h2>
            <fieldset>
                <label htmlFor="title">Title:</label>
                <input
                    onChange={
                        (evt) => {
                            const copy = { ...newComment }
                            copy.title = evt.target.value
                            setNewComment(copy)
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
                            const copy = { ...newComment }
                            copy.content = evt.target.value
                            setNewComment(copy)
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
                    Save Comment
                </button>
            </fieldset>
        </form>
    )
}