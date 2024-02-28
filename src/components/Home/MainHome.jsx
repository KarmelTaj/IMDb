import React from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import MovieList from "./MovieList";
import { homeMainHome as theme } from "../../utils/theme";

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
