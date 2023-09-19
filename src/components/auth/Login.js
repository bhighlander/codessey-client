import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useState } from "react"
import { useNavigate } from "react-router"
import { loginUser } from "../../api/authManager"
import { Button, Container, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';

export const Login = ({ setToken }) => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()
    const [isUnsuccessful, setIsUnsuccessful] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()

        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    setToken(res.token)
                    setIsUnsuccessful(false)
                    navigate("/")
                }
                else {
                    setIsUnsuccessful(true)
                }
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <Container alignItems='center'>
            <Grid container spacing={2}
            sx={{ height: 500 }}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
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
            <Typography variant='h4' align='center'>Welcome to Codessey</Typography>
            <Typography variant='subtitle1' align='center'>Please sign in</Typography>
            </Grid>
            <Grid item style={{ width: '30%' }}>
            <form onSubmit={handleLogin}>
                <Grid container spacing={2} sx={{ margin: .5 }} direction={'column'}>
                <Grid item>
                <FormControl>
                    <TextField
                    className="form-control"
                    id='username'
                    name='username'
                    label="Username"
                    variant="outlined"
                    required
                    value={user.username}
                    onChange={handleChange}
                    />
                </FormControl>
                </Grid>
                <Grid item>
                <FormControl>
                    <TextField
                    className="form-control"
                    id='password'
                    name='password'
                    label="Password"
                    variant="outlined"
                    type='password'
                    required
                    value={user.password}
                    onChange={handleChange}
                    />
                </FormControl>
                </Grid>
                <Grid item>
                    <Button variant="contained" type='submit'>Login</Button>
                    </Grid>
                </Grid>
                </form>
                </Grid>
                <Grid item>
                <Link href="/register">Not a member yet?</Link>
            {
                isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
            }
            </Grid>
            </Grid>
        </Container>

    )
}