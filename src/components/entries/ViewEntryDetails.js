import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSingleEntry } from "../../api/entryManager"

export const EntryDetails = ({ token }) => {
    const { entryId } = useParams()
    const [entry, setEntry] = useState({})

    useEffect(() => {
        getSingleEntry(entryId, token)
            .then(setEntry)
    }, [entryId, token])

    return (
        <section className="entry">
            <h3 className="entry__title">{entry.title}</h3>
            <div className="entry__content">{entry.content}</div>
            <div className="entry__date">{entry.publication_date}</div>
        </section>
    )
}