import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Link from '@mui/material/Link'

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate();

    if (!token) {
        return null;
    }

    return (
        <header className="navbar">
            <span className="navbar__title">Codessey</span>
            <nav>
                <Link className="navbar__link" href="/">Home</Link>
                <Link className="navbar__link" href="/entries">Entries</Link>
                <Link className="navbar__link" href="/categories">Categories</Link>
                <Link className="navbar__link" href="/entries/create">New Entry</Link>
                <div className="buttons">

                        <Button
                            className="button is-outlined"
                            onClick={() => {
                                setToken("");
                                navigate("/login");
                            }}
                        >
                            Logout
                        </Button>
                </div>
            </nav>
        </header>
    );
}
