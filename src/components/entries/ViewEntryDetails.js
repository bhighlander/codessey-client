import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { addEntryCategory, deleteEntry, getSingleEntry, removeEntryCategory } from "../../api/entryManager"
import { deleteComment, getCommentByEntryId } from "../../api/commentManager"
import { useNavigate } from "react-router-dom"
import { getAllCategories, getCategoriesByEntryId } from "../../api/categoryManager"

export const EntryDetails = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [entry, setEntry] = useState({})
    const [comments, setComments] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [entryCategories, setEntryCategories] = useState([])

    const handleDelete = () => { // TODO add mui confirmation modal
        deleteEntry(entryId, token)
            .then(() => {
                navigate("/entries")
            })
    }

    useEffect(() => {
        getSingleEntry(entryId, token)
            .then(setEntry)
    }, [entryId, token])

    useEffect(() => {
        getCommentByEntryId(entryId, token)
            .then(setComments)
    }, [entryId, token])

    useEffect(() => {
        getAllCategories(token)
            .then(setCategories)
    }, [token])

    useEffect(() => {
        getCategoriesByEntryId(entryId, token)
            .then(setEntryCategories)
    }, [entryId, token])

    const handleAddCategory = () => {
        addEntryCategory(entryId, selectedCategory, token)
            .then(() => {
                return getCategoriesByEntryId(entryId, token);
            })
            .then(updatedCategories => {
                setEntryCategories(updatedCategories);
            })
    };

    const handleDeleteCategory = (e) => { // TODO add mui confirmation modal
        e.preventDefault()
        removeEntryCategory(entryId, e.target.id, token)
            .then(() => {
                getCategoriesByEntryId(entryId, token)
                    .then(setEntryCategories)
            })
    }

    const handleDeleteComment = (e) => { // TODO add mui confirmation modal
        e.preventDefault()
        deleteComment(e.target.id, token)
            .then(() => {
                getCommentByEntryId(entryId, token)
                    .then(setComments)
            })
    }
    

    return (
        <>
        <section className="entry">
            <h3 className="entry__title">{entry.title}</h3>
            <div className="entry__content">{entry.content}</div>
            <div className="entry__date">{entry.publication_date}</div>
            <button className="btn btn-primary" onClick={() => {
                navigate(`/entries/edit/${entryId}`)
            }}>Edit</button>
            <button className="btn btn-primary" onClick={handleDelete}>Delete</button>
        </section>
        <section className="categories">
            <h3>Current Categories</h3>
            {
                entryCategories.map(category => {
                    return <>
                    <div className="category" key={category.id}>
                        <div className="category__label">{category.label}</div>
                    </div>
                    <button className="btn btn-primary" id={category.id} onClick={handleDeleteCategory}>X</button>
                    </>
                })
            }
        </section>
        <section className="comments">
            <h3>Comments</h3>
            {
                comments.map(comment => {
                    return <div className="comment" key={comment.id}>
                        <div className="comment__author">{comment.author.user.username}</div>
                        <div className="comment__title"><h3>{comment.title}</h3></div>
                        <div className="comment__content">{comment.content}</div>
                        <button className="btn btn-primary" id={comment.id} onClick={handleDeleteComment}>Delete</button>
                    </div>
                })
            }
            <button className="btn btn-primary" onClick={() => {
                navigate(`/comments/create/${entryId}`)
            }}>Add Comment</button>
        </section>
        <section className="categories">
            <h3>Categories</h3>
            <select className="form-control" onChange={e => setSelectedCategory(e.target.value)}>
                <option value="0">Select a category</option>
                {
                    categories.filter(category => 
                        !entryCategories.some(entryCategory => entryCategory.id === category.id)
                    ).map(category => {
                        return <option key={category.id} value={category.id}>{category.label}</option>
                    })
                }
            </select>

            <button className="btn btn-primary" onClick={handleAddCategory}>Update Category</button>
        </section>
        </>
    )
}