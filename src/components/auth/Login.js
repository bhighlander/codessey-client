import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { loginUser } from "../../api/authManager"
import { Button } from '@mui/material';
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
                    navigate("/")
                }
                else {
                    setIsUnsuccessful(true)
                }
            })
    }

    return (
        <>
        <h1>Codessey</h1>
        <h2>Please sign in</h2>
        <form onSubmit={handleLogin}>
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
        <Button variant="contained" type='submit'>Login</Button>
        </form>
        <Link href="/register">Not a member yet?</Link>
        {
            isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
        }
</>

    )
}