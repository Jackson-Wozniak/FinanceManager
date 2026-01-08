import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypeBackground {
        primary: string;
        secondary?: string;
        accent?: string;
        secondaryAccent?: string
    }
}