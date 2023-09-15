import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../api/authManager"
import { FormControl } from "@mui/base"
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Link, TextField, Typography } from "@mui/material"

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
        <Container>
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
            
            <Grid container 
                spacing={2} 
                sx={{ margin: .5, height: '500px' }} 
                direction={'column'} 
                alignItems={"center"} 
                justifyContent={"center"}
            >
                <Grid item>
                    <Typography align="center">Welcome to Codessey</Typography>
                    <Typography align="center">Please register</Typography>
                </Grid>
    
                <Grid item style={{ width: '50%'}}>
                    <form onSubmit={handleRegister}>
                        <Grid container spacing={2} sx={{ margin: .5 }} direction={'column'}>
                <Grid container spacing={2} direction={'column'} alignItems={'center'}>
                <Grid item sx={{width: 500}}>
            <FormControl>
                <TextField
                    style={{width: '100%'}}
                    className="form-control"
                    id='firstName'
                    label="First Name"
                    variant="outlined"
                    required
                    ref={firstName}
                    onChange={(e) => {firstName.current.value = e.target.value}}
                />
            </FormControl>
            </Grid>
            <Grid item sx={{width: 500}}>
            <FormControl>
                <TextField
                    style={{width: '100%'}}
                    className="form-control"
                    id='lastName'
                    label="Last Name"
                    variant="outlined"
                    required
                    ref={lastName}
                    onChange={(e) => {lastName.current.value = e.target.value}}
                />
            </FormControl>
            </Grid>
            <Grid item sx={{width: 500}}>
            <FormControl>
                <TextField
                    style={{width: '100%'}}
                    className="form-control"
                    id='email'
                    label="Email"
                    variant="outlined"
                    required
                    ref={email}
                    onChange={(e) => {email.current.value = e.target.value}}
                />
            </FormControl>
            </Grid>
            <Grid item sx={{width: 500}}>
            <FormControl>
                <TextField
                    style={{width: '100%'}}
                    className="form-control"
                    id='username'
                    label="Username"
                    variant="outlined"
                    required
                    ref={username}
                    onChange={(e) => {username.current.value = e.target.value}}
                />
            </FormControl>
            </Grid>
            <Grid item>
            <Grid container spacing={2} direction={'row'}>
                <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            </Grid>
            </Grid>
                        <Grid item>
                            <Button variant="contained" type='submit'>Register</Button>
                        </Grid>
                <Grid item>
                    <Link href="/login">Already registered? Login here.</Link>
                </Grid>
            </Grid>
            </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
)
    }