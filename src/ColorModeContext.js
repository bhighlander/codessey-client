import React, { createContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, teal, grey } from "@mui/material/colors";

export const ColorModeContext = createContext({
    mode: 'light',
    toggleColorMode: () => {}
});

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        const savedMode = localStorage.getItem('mode');
        if(savedMode) {
            setMode(savedMode);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
            main: blue[300],
            },
            secondary: {
            main: teal[700],
        },
            background: {
            default: grey[200],
            paper: grey[50],
            },
        },
    });
    
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
            main: blue[700],
        },
            secondary: {
            main: teal[300],
        },
            background: {
            default: '#192231',
            paper: '#24344d',
        },
        },
    });
    
    const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => {
            setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
        },
        }),
        [mode],
    );
    
        const theme = useMemo(
        () => {
            return mode === 'light' ? lightTheme : darkTheme;
        },
        [mode, lightTheme, darkTheme],
    );

    return (
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
    );
};
