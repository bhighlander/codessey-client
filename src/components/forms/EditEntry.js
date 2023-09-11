import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleEntry, updateEntry } from "../../api/entryManager"

export const EditEntry = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [entry, setEntry] = useState({})

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
            <fieldset>
                <label htmlFor="title">Title:</label>
                <input
                    onChange={
                        (evt) => {
                            const copy = { ...entry }
                            copy.title = evt.target.value
                            setEntry(copy)
                        }
                    }
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={entry.title}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="content">Content:</label>
                <textarea
                    onChange={
                        (evt) => {
                            const copy = { ...entry }
                            copy.content = evt.target.value
                            setEntry(copy)
                        }
                    }
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Content"
                    value={entry.content}
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