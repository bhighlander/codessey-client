import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { addEntryCategory, deleteEntry, getSingleEntry, removeEntryCategory } from "../../api/entryManager"
import { deleteComment, getCommentByEntryId } from "../../api/commentManager"
import { useNavigate } from "react-router-dom"
import { getAllCategories, getCategoriesByEntryId } from "../../api/categoryManager"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

export const EntryDetails = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [entry, setEntry] = useState({})
    const [comments, setComments] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [entryCategories, setEntryCategories] = useState([])
    const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false)

    const handleDeleteConfirmationModalOpen = () => {
        setDeleteConfirmationModalOpen(true)
    }

    const handleDelete = () => {
        handleDeleteConfirmationModalOpen()

    }

    const handleDeleteConfirmationModalClose = (shouldDelete) => {
        if (shouldDelete) {
            deleteEntry(entryId, token)
                .then(() => {
                    navigate("/entries")
                })
        }
        setDeleteConfirmationModalOpen(false)
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
            <Button className="btn btn-primary" onClick={() => {
                navigate(`/entries/edit/${entryId}`)
            }}>Edit</Button>
            <Button className="btn btn-primary" onClick={handleDelete}>Delete</Button>
        </section>
        <section className="categories">
            <h3>Current Categories</h3>
            {
                entryCategories.map(category => {
                    return <>
                    <div className="category" key={category.id}>
                        <div className="category__label">{category.label}</div>
                    </div>
                    <HighlightOffOutlinedIcon id={category.id} onClick={handleDeleteCategory} />
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
                        <Button className="btn btn-primary" id={comment.id} onClick={handleDeleteComment}>Delete</Button>
                    </div>
                })
            }
            <Button className="btn btn-primary" onClick={() => {
                navigate(`/comments/create/${entryId}`)
            }}>Add Comment</Button>
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

            <Button className="btn btn-primary" onClick={handleAddCategory}>Update Category</Button>
        </section>
        <Dialog
        open={deleteConfirmationModalOpen}
        onClose={() => handleDeleteConfirmationModalClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this entry?
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleDeleteConfirmationModalClose(false)}>Cancel</Button>
            <Button onClick={() => handleDeleteConfirmationModalClose(true)} autoFocus>
            Delete
            </Button>
        </DialogActions>
        </Dialog>
        </>
    )
}