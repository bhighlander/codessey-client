import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { addEntryCategory, deleteEntry, getSingleEntry, removeEntryCategory, toggleEntrySolved } from "../../api/entryManager"
import { getCommentByEntryId } from "../../api/commentManager"
import { useNavigate } from "react-router-dom"
import { getAllCategories, getCategoriesByEntryId } from "../../api/categoryManager"
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { CommentCard } from "../comments/CommentCard"
import Grid from '@mui/material/Grid'

export const EntryDetails = ({ token }) => {
    const { entryId } = useParams()
    const navigate = useNavigate()
    const [entry, setEntry] = useState({})
    const [comments, setComments] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [entryCategories, setEntryCategories] = useState([])
    const [deleteEntryModal, setDeleteEntryModal] = useState(false)
    const [solved, setSolved] = useState(false)

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

    const handleDeleteCategory = (categoryId) => {
        removeEntryCategory(entryId, categoryId, token)
            .then(() => {
                getCategoriesByEntryId(entryId, token)
                    .then(setEntryCategories)
            })
    }

    useEffect(() => {
        getSingleEntry(entryId, token)
            .then(setEntry)
            .then(() => {
                setSolved(entry.solved)
            })
    }, [entryId, token, entry.solved])

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

    const handleToggleSolved = () => {
        toggleEntrySolved(entryId, entry.solved, token)
            .then(() => {
                getSingleEntry(entryId, token)
                    .then(setEntry)
            })
    }


    return (
        <Grid container spacing={4} className="entry-details-layout" sx={{ margin: 2 }}>
            <Grid item xs={12} md={8} style={{ maxWidth: '50%' }}>
            <Box className="entry-column">
                <Grid item xs={12} md={8} style={{ maxWidth: '50%' }}>
                <Box className="entry">
                    <Typography variant="h5" className="entry__title">{entry.title}</Typography>
                        <Typography variant="button">Solved: {entry.solved ? "Yes" : "No"}</Typography>

                    <FormGroup className="entry__approved">
                        <FormControlLabel control={<Checkbox checked={solved} />} label="Solved" onChange={handleToggleSolved} />
                    </FormGroup>

                    <Typography variant="body1" className="entry__content" style={{ whiteSpace: "pre-wrap" }}>{entry.content}</Typography>
                    <Typography variant="caption" className="entry__date">{entry.publication_date}</Typography>
                    <br />
                    <Button className="btn btn-primary" onClick={() => {
                        navigate(`/entries/edit/${entryId}`)
                    }}>Edit</Button>

                    <Button className="btn btn-primary" onClick={handleDeleteEntry}>Delete</Button>

                </Box>
                </Grid>
                <Grid container spacing={2} sx={{ margin: 1, width: '100%' }}>
                    <Grid item>
                <Box className="entry-comments">
                    <Typography variant="h6">Comments</Typography>
                    {
                    comments?.map(comment => (
                        <Box sx={{ margin: 1 }} key={comment.id}>
                        <CommentCard comment={comment} token={token} getComments={() => getCommentByEntryId(entryId, token).then(setComments)} />
                        </Box>
                    ))
                    }

                </Box>
                    </Grid>
                </Grid>
                    <Button className="btn btn-primary" onClick={() => {
                        navigate(`/comments/create/${entryId}`)
                    }}>Add Comment</Button>

            </Box>
                    </Grid>
            <Grid item xs={12} md={4} style={{ maxWidth: '30%' }}>
                <Box className="categories-column">
                    <Typography variant="h6">Current Categories</Typography>
                    <br />
                    <Grid className="current-categories">
                    <Grid container spacing={2} direction="row">
                        {entryCategories.length > 0 ? (
                            entryCategories.map(category => {
                                return (
                                    <Grid item key={category.id}>
                                        <Box>
                                            <div className="category">
                                                <Typography variant="button" className="category__label">{category.label}</Typography>
                                                <br />
                                                <IconButton aria-label="Remove Category" onClick={() => handleDeleteCategory(category.id)}>
                                                <HighlightOffOutlinedIcon />
                                                </IconButton>
                                            </div>
                                        </Box>
                                    </Grid>
                                )
                            })
                        ) : (
                            <Typography variant="button">None</Typography>
                        )}
                    </Grid>


                    </Grid>
                <Grid item>
                <Box className="update-categories">
                    <Typography variant="h6">Categories</Typography>

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
                            <br />
                    <Button className="btn btn-primary" onClick={handleAddCategory}>Add Category</Button>
                </Box>
                </Grid>
                <Dialog
                open={deleteEntryModal}
                onClose={() => handleDeleteEntryModalClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >

                    <DialogTitle variant="h6" id="alert-dialog-title">
                        Are you sure you want to delete this entry?
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText variant="button" id="alert-dialog-description">
                        This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => handleDeleteEntryModalClose(false)}>Cancel</Button>
                        <Button onClick={() => handleDeleteEntryModalClose(true)}>Delete</Button>
                    </DialogActions>

                </Dialog>
            </Box>
            </Grid>
        </Grid>
    )
}