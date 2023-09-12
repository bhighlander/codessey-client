import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate()

    return (
        <header className="navbar">
            <span className="navbar__title">Codessey</span>
            <nav>
                <Link className="navbar__link" to="/">Home</Link>
                <Link className="navbar__link" to="/entries">Entries</Link>
                <Link className="navbar__link" to="/categories">Categories</Link>
                <Link className="navbar__link" to="/entries/create">New Entry</Link>
                <div className="buttons">
                            {token ? (
                                <Button
                                    className="button is-outlined"
                                    onClick={() => {
                                        setToken("");
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Link to="/register" className="button is-link">
                                        Register
                                    </Link>
                                    <Link to="/login" className="button is-outlined">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
            </nav>
        </header>
    )
}