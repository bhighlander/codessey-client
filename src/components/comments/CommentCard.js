import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { deleteComment } from "../../api/commentManager"
import { useState } from "react"

export const CommentCard = ({ comment, token, getComments }) => {
    const [deleteCommentModal, setDeleteCommentModal] = useState(false)

    const handleDeleteComment = () => {
        handleDeleteEntryModal()
    }

    const handleDeleteEntryModal = () => {
        setDeleteCommentModal(true)
    }

    const handleDeleteEntryModalClose = (commentId, shouldDelete) => {
        if (shouldDelete) {
            deleteComment(commentId, token)
                .then(() => {
                    getComments()
                })
        }
        setDeleteCommentModal(false)
    }

    return (
        <div>
        <Box>
            <Card>
                <CardContent>
                    <Typography>{comment.title}</Typography>
                    <Typography>{comment.content}</Typography>
                    <Typography>{comment.publication_date}</Typography>
                </CardContent>
                <Box>
                    <Stack direction="row" spacing={2}>
                    <Button>Edit</Button>
                    <Button onClick={(e) => handleDeleteComment(e, comment.id)}>Delete</Button>
                    </Stack>
                </Box>
            </Card>
        </Box>
        <Dialog
        open={deleteCommentModal}
        onClose={() => handleDeleteEntryModalClose(comment.id, false)}
        aria-labelledby="alert-dialog-title"    
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete this comment?
            </DialogTitle>
            <DialogContent>
                This action cannot be undone.
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDeleteEntryModalClose(comment.id, false)}>Cancel</Button>
                <Button onClick={() => handleDeleteEntryModalClose(comment.id, true)}>Delete</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}