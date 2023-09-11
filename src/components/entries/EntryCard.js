import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

export const EntryCard = ({ entry }) => {
    const navigate = useNavigate()

    return (
        <section className="entry">
            <Link to={`/entries/${entry.id}`}>
            <h3 className="entry__title">{entry.title}</h3>
            </Link>
            <div className="entry__content">{entry.content}</div>
            <button className="btn btn-primary" onClick={() => {
                navigate(`/entries/edit/${entry.id}`)
            }}>Edit</button>

        </section>
    )
}