import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../api/authManager"
import { FormControl } from "@mui/base"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Link, TextField, Typography } from "@mui/material"

export const Register = ({ setToken }) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const navigate = useNavigate()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                password: password.current.value
            }

            registerUser(newUser).then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    setToken(res.token)
                    navigate("/entries")
                }
            })
        }
        else {
            setIsDialogOpen(true)
        }
    }

    return (
    <Box>
    <Dialog className="passwordDialog" open={isDialogOpen}>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Passwords do not match.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogActions>
    </Dialog>
    <Typography>Welcome to Codessey</Typography>
    <Typography>Please register</Typography>
    <form onSubmit={handleRegister}>
        <FormControl>
            <TextField
                className="form-control"
                id='firstName'
                label="First Name"
                variant="outlined"
                required
                ref={firstName}
                onChange={(e) => {firstName.current.value = e.target.value}}
            />
        </FormControl>
        <FormControl>
            <TextField
                className="form-control"
                id='lastName'
                label="Last Name"
                variant="outlined"
                required
                ref={lastName}
                onChange={(e) => {lastName.current.value = e.target.value}}
            />
        </FormControl>
        <FormControl>
            <TextField
                className="form-control"
                id='email'
                label="Email"
                variant="outlined"
                required
                ref={email}
                onChange={(e) => {email.current.value = e.target.value}}
            />
        </FormControl>
        <FormControl>
            <TextField
                className="form-control"
                id='username'
                label="Username"
                variant="outlined"
                required
                ref={username}
                onChange={(e) => {username.current.value = e.target.value}}
            />
        </FormControl>
        <FormControl>
            <TextField
                className="form-control"
                id='password'
                label="Password"
                variant="outlined"
                type='password'
                required
                ref={password}
                onChange={(e) => {password.current.value = e.target.value}}
            />
        </FormControl>
        <FormControl>
            <TextField
                className="form-control"
                id='verifyPassword'
                label="Verify Password"
                variant="outlined"
                type='password'
                required
                ref={verifyPassword}
                onChange={(e) => {verifyPassword.current.value = e.target.value}}
            />
        </FormControl>
        <Button variant="contained" type='submit'>Register</Button>
    </form>
        <Link href="/login">Already registered? Login here.</Link>
    </Box>
    )
}