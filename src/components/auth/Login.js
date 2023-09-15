import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { loginUser } from "../../api/authManager"
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';

export const Login = ({ setToken }) => {
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [isUnsuccessful, setIsUnsuccessful] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            username: username.current.value,
            password: password.current.value
        }

        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    setToken(res.token)
                    setIsUnsuccessful(false)
                    navigate("/entries")
                }
                else {
                    setIsUnsuccessful(true)
                }
            })
    }

    return (
        <Container alignItems='center'>
            <Grid container spacing={2}
            sx={{ height: 500 }}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            >
            <Grid item>
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
                    label="Username"
                    variant="outlined"
                    required
                    ref={username}
                    onChange={(e) => {username.current.value = e.target.value}}
                    />
                </FormControl>
                </Grid>
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
                    <Button variant="contained" type='submit'>Login</Button>
                    </Grid>
                </Grid>
                </form>
                </Grid>
                <br />
                <Link href="/register">Not a member yet?</Link>
            {
                isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
            }
            </Grid>
        </Container>

    )
}