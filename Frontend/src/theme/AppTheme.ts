import { createTheme, type Theme } from "@mui/material/styles";

export const LightTheme = createTheme({
    palette : {
        primary: {
            main: "rgba(16, 186, 13, 1)",
            contrastText: "#ffffffff"
        },
        secondary: {
            main: "#e2ee15",
            contrastText: "#272727ff"
        },
        mode: 'light',
        background : {
            primary: "white",
            secondary: "whitesmoke",
            accent: "grey"
        },
        text: {
            primary: "#000000",
            secondary: "#3d3d3d"
        }
    },
});

export const DarkTheme = createTheme({
    palette : {
        primary: {
            main: "rgba(26, 166, 23, 1)",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#e2ee15",
            contrastText: "#797979"
        },
        mode: 'dark',
        background : {
            primary: "#0d1117",
            secondary: "#151b23",
            accent: "#2e2e2e"
        },
        text: {
            primary: "#ffffff",
            secondary: "#d0d0d0ff"
        },
    },
});