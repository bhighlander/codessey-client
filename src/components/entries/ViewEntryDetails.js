import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { addEntryCategory, deleteEntry, getSingleEntry, removeEntryCategory } from "../../api/entryManager"
import { deleteComment, getCommentByEntryId } from "../../api/commentManager"
import { useNavigate } from "react-router-dom"
import { getAllCategories, getCategoriesByEntryId } from "../../api/categoryManager"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

export const EntryDetails = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [entry, setEntry] = useState({})
    const [comments, setComments] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [entryCategories, setEntryCategories] = useState([])
    const [deleteEntryModal, setDeleteEntryModal] = useState(false)
    const [deleteCommentModal, setDeleteCommentModal] = useState(false)
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

    const handleDeleteEntry = () => {
        handleDeleteEntryModal()
    }

    const handleDeleteEntryModal = () => {
        setDeleteEntryModal(true)
    }

    const handleDeleteEntryModalClose = (shouldDelete) => {
        if (shouldDelete) {
            deleteEntry(entryId, token)
                .then(() => {
                    navigate("/entries")
                })
        }
        setDeleteEntryModal(false)
    }

    const handleDeleteCategory = (categoryId) => { // TODO add mui confirmation modal
        removeEntryCategory(entryId, categoryId, token)
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


    return (
        <>
        <section className="entry">
            <h3 className="entry__title">{entry.title}</h3>
            <div className="entry__content">{entry.content}</div>
            <div className="entry__date">{entry.publication_date}</div>
            <Button className="btn btn-primary" onClick={() => {
                navigate(`/entries/edit/${entryId}`)
            }}>Edit</Button>
            <Button className="btn btn-primary" onClick={handleDeleteEntry}>Delete</Button>
        </section>
        <section className="categories">
            <h3>Current Categories</h3>
            {
                entryCategories.map(category => {
                    return (
                    <div key={category.id}>
                        <div className="category" key={category.id}>
                            <div className="category__label">{category.label}</div>
                        </div>
                        <HighlightOffOutlinedIcon onClick={() => handleDeleteCategory(category.id)} />
                    </div>)
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
            <FormControl sx={{m:1, minWidth: 120}} size="small">
            <Select fullWidth value={selectedCategory} className="form-control" onChange={e => setSelectedCategory(e.target.value)}>
                <InputLabel id="category-label">Select a Category</InputLabel>
                {
                    categories.filter(category => 
                        !entryCategories.some(entryCategory => entryCategory.id === category.id)
                    ).map(category => {
                        return <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
                    })
                }
            </Select>
            </FormControl>
            <Button className="btn btn-primary" onClick={handleAddCategory}>Update Category</Button>
        </section>
        <Dialog
        open={deleteEntryModal}
        onClose={() => handleDeleteEntryModalClose(false)}
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
            <Button onClick={() => handleDeleteEntryModalClose(false)}>Cancel</Button>
            <Button onClick={() => handleDeleteEntryModalClose(true)} autoFocus>
            Delete
            </Button>
        </DialogActions>
        </Dialog>
        </>
    )
}