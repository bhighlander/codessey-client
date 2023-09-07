import { useNavigate } from "react-router"
import { deleteEntry } from "../../api/entryManager"

export const EntryCard = ({ entry }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        deleteEntry(entry.id)
            .then(() => {
                navigate("/entries")
            })
    }

    return (
        <section className="entry">
            <h3 className="entry__title">{entry.title}</h3>
            <div className="entry__content">{entry.content}</div>
            <button className="btn btn-primary" onClick={() => {
                navigate(`/entries/edit/${entry.id}`)
            }}>Edit</button>
            <button className="btn btn-primary" onClick={handleDelete}>Delete</button>
        </section>
    )
}