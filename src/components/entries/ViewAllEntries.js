import { useEffect, useState } from "react"
import { EntryCard } from "./EntryCard"
import { getUserEntries } from "../../api/entryManager"

export const EntriesList = ({ token }) => {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        getUserEntries(token)
            .then(setEntries)
    }, [])

    return (
        <>
            <h1>Entries</h1>
            <div className="entries">
                {
                    entries.map(entry => <EntryCard key={entry.id} entry={entry} />)
                }
            </div>
        </>
    )
}