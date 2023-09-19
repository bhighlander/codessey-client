import { useNavigate } from "react-router-dom"
import { registerUser } from "../../api/authManager"
import { FormControl } from "@mui/base"
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"

export const Register = ({ setToken }) => {
    const [newUser, setNewUser] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        verifyPassword: ""
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();
    
        if (newUser.password === newUser.verifyPassword) {
            registerUser(newUser).then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    setToken(res.token);
                    navigate("/");
                } else if ("error" in res) {
                    setErrorMessage(res.error);
                    setIsDialogOpen(true);
                }
            });
        } else {
            setErrorMessage("Passwords do not match");
            setIsDialogOpen(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Container>
            <Dialog className="passwordDialog" open={isDialogOpen}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorMessage}
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
                <Grid item 
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: 'auto'
                    }}
                >
                    <img src='./codessey_logo.png' alt='Codessey'
                        style={{ 
                            maxWidth: '50%', 
                            maxHeight: '50%',
                            display: 'block'
                        }} 
                    />
                    <Typography variant="h4" align="center">Welcome to Codessey</Typography>
                    <Typography variant="subtitle1" align="center">Please register</Typography>
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
                    name="first_name"
                    label="First Name"
                    variant="outlined"
                    required
                    value={newUser.first_name}
                    onChange={handleChange}
                />
            </FormControl>
            </Grid>
            <Grid item sx={{width: 500}}>
            <FormControl>
                <TextField
                    style={{width: '100%'}}
                    className="form-control"
                    id='lastName'
                    name="last_name"
                    label="Last Name"
                    variant="outlined"
                    required
                    value={newUser.last_name}
                    onChange={handleChange}
                />
            </FormControl>
            </Grid>
            <Grid item sx={{width: 500}}>
            <FormControl>
                <TextField
                    style={{width: '100%'}}
                    className="form-control"
                    id='email'
                    name="email"
                    label="Email"
                    variant="outlined"
                    required
                    value={newUser.email}
                    onChange={handleChange}
                />
            </FormControl>
            </Grid>
            <Grid item sx={{width: 500}}>
            <FormControl>
                <TextField
                    style={{width: '100%'}}
                    className="form-control"
                    id='username'
                    name="username"
                    label="Username"
                    variant="outlined"
                    required
                    value={newUser.username}
                    onChange={handleChange}
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
                    name="password"
                    label="Password"
                    variant="outlined"
                    type='password'
                    required
                    value={newUser.password}
                    onChange={handleChange}
                />
            </FormControl>
            </Grid>
            <Grid item>
            <FormControl>
                <TextField
                    className="form-control"
                    id='verifyPassword'
                    name="verifyPassword"
                    label="Verify Password"
                    variant="outlined"
                    type='password'
                    required
                    value={newUser.verifyPassword}
                    onChange={handleChange}
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
