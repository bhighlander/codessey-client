import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { loginUser } from "../../api/authManager"
import { Link } from "react-router-dom"

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
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Codessey</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="username"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            {
            isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
            }
        </main>
    )
}