import React from "react";
import { Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MovieList from "./MovieList";

const theme = createTheme({
    spacing: 8,
    palette: {
        primary: {
            main: '#f5c518',
            contrastText: '#000',
        },
    },
});

const MainHome = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: '#000', pt: 10, height: '100vh', overflow: 'auto' }}>
                <Typography variant="h4" align="center" color={'primary.main'} sx={{ pt: 10, fontWeight: 600 }}>Explore Movies & TV shows</Typography>
                <MovieList sx={{ height: 'calc(100% - 64px)' /* Adjust as needed based on your design */ }} />
            </Box>
        </ThemeProvider>
    );
}

export default MainHome;
