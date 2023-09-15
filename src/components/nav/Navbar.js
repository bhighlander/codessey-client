import { useNavigate } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, IconButton, Typography } from '@mui/material'
import { Category, Logout, Note, NoteAdd } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ColorModeContext } from '../../ColorModeContext';

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const { mode, toggleColorMode } = useContext(ColorModeContext);

    if (!token) {
        return null;
    }

    return (
        <header className="navbar">
            <BottomNavigation
            showLabels
            className="navbar__links"
            >
                {/* <Typography>Codessey</Typography> replace with logo */}
                <BottomNavigationAction label="Entries" icon={<Note />} onClick={() => navigate("/entries")}/>
                <BottomNavigationAction label="Categories" icon={<Category />} onClick={() => navigate("/categories")}/>
                <BottomNavigationAction label="New Entry" icon={<NoteAdd />} onClick={() => navigate("/entries/create")}/>
                <BottomNavigationAction label="Logout" icon={<Logout />}
                onClick={() => {
                    setToken("")
                    navigate("/login")
                }}
                />
                <IconButton onClick={toggleColorMode}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </BottomNavigation>
        </header>
    );
}
