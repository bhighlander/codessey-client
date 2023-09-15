import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Codessey } from "./Codessey";
import { CssBaseline } from "@mui/material";
import { ColorModeProvider } from "./ColorModeContext"; 

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <ColorModeProvider>
            <CssBaseline />
            <Codessey />
        </ColorModeProvider>
    </BrowserRouter>
);
