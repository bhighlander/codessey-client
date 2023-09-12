import Link from '@mui/material/Link'

export const EntryCard = ({ entry }) => {


    return (
        <section className="entry">
            <Link href={`/entries/${entry.id}`}>
            <h3 className="entry__title">{entry.title}</h3>
            </Link>
            <div className="entry__content">{entry.content}</div>


        </section>
    )
}