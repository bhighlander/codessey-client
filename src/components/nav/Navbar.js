import { useNavigate } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Button, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { Category, Logout, Note, NoteAdd } from '@mui/icons-material';

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate();

    if (!token) {
        return null;
    }

    return (
        <header className="navbar">
            <BottomNavigation
            showLabels
            className="navbar__links"
            >
                <Typography>Codessey</Typography> {/* replace with logo */}
                <BottomNavigationAction label="Entries" icon={<Note />} onClick={() => navigate("/entries")}/>
                <BottomNavigationAction label="Categories" icon={<Category />} onClick={() => navigate("/categories")}/>
                <BottomNavigationAction label="New Entry" icon={<NoteAdd />} onClick={() => navigate("/entries/create")}/>
                <BottomNavigationAction label="Logout" icon={<Logout />}
                onClick={() => {
                    setToken("")
                    navigate("/login")
                }}
                />
            </BottomNavigation>
        </header>
    );
}
