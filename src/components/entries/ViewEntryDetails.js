import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSingleEntry } from "../../api/entryManager"
import { getCommentByEntryId } from "../../api/commentManager"
import { useNavigate } from "react-router-dom"

export const EntryDetails = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [entry, setEntry] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {
        getSingleEntry(entryId, token)
            .then(setEntry)
    }, [entryId, token])

    useEffect(() => {
        getCommentByEntryId(entryId, token)
            .then(setComments)
    }, [entryId, token])

    return (
        <>
        <section className="entry">
            <h3 className="entry__title">{entry.title}</h3>
            <div className="entry__content">{entry.content}</div>
            <div className="entry__date">{entry.publication_date}</div>
        </section>
        <section className="comments">
            <h3>Comments</h3>
            {
                comments.map(comment => {
                    return <div className="comment" key={comment.id}>
                        <div className="comment__author">{comment.author.user.username}</div>
                        <div className="comment__title"><h3>{comment.title}</h3></div>
                        <div className="comment__content">{comment.content}</div>
                    </div>
                })
            }
            <button className="btn btn-primary" onClick={() => {
                navigate(`/comments/create/${entryId}`)
            }}>Add Comment</button>
        </section>
        </>
    )
}