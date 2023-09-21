import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Button, Avatar } from '@mui/material'
import { Category, Logout, Note, NoteAdd } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ColorModeContext } from '../../ColorModeContext';
import { Box } from '@mui/system';

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const { mode, toggleColorMode } = useContext(ColorModeContext);

    if (!token) {
        return null;
    }

    return (
        <header className="navbar">
            <AppBar position="static">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, maxWidth: '100%', overflowX: 'hidden' }}>
                        <Button color="inherit" onClick={() => navigate("/")} startIcon={<Avatar src='./codessey_logo.png' />}>Home</Button>
                        <Button color="inherit" onClick={() => navigate("/entries")} startIcon={<Note />}>Entries</Button>
                        <Button color="inherit" onClick={() => navigate("/categories")} startIcon={<Category />}>Categories</Button>
                        <Button color="inherit" onClick={() => navigate("/entries/create")} startIcon={<NoteAdd />}>New Entry</Button>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                        <Button style={{ marginRight: 20 }} variant='outlined' color="warning" onClick={() => {
                            setToken("")
                            navigate("/login")
                        }} startIcon={<Logout />}>Logout</Button>
                        <IconButton onClick={toggleColorMode} style={{ marginRight: 10 }}>
                            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}