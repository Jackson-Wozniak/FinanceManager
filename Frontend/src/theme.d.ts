import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypeBackground {
        primary?: string;
        secondary?: string;
        accent?: string;
        lighter?: string;
        darker?: string;
    }
    interface Theme {
        width: number;
        height: number;
        gridRecall: {
            gridButton: {
                correct: string,
                incorrect: string,
                flashed: string,
                none: string,
            }
        }
    }
}