import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { useState, useMemo } from "react";
import { Codessey } from "./Codessey"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { blue, teal, grey } from "@mui/material/colors";

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

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Codessey />
        </ThemeProvider>
    </BrowserRouter>
)
