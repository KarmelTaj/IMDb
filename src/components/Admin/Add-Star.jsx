import React, { useState } from "react";
import { Box, Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { post } from "../../utils/httpClient";

const theme = createTheme({
    palette: {
        primary: {
            main: '#f5c518',
            contrastText: '#000',
        },
        secondary: {
            main: '#000',
            contrastText: '#fff',
        },
        backgrounds: {
            tab: '#1f1f1f',
            contrastText: '#000',
            panel: '#fff',
        }
    },
});

const AddStar = () => {

    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");

    const handleSend = async () => {
        const response = await post("/admin/add-star", { name, picture });
        if (response.error) {
            console.log(response.message);
            setUsername("");
            setPassword("");
        } else {
            //success
            setUsername("");
            setPassword("");
        }
    };


    return <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ borderRadius: '12px' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" fontWeight='600'>
                        Add a New Star
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            color="secondary"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Star Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            color="secondary"
                            margin="normal"
                            required
                            fullWidth
                            id="picture-url"
                            label="Picture URL"
                            name="picture-url"
                            autoComplete="current-picture"
                            value={picture}
                            onChange={(e) => setPicture(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2, fontWeight: '600', fontSize: '1rem', lineHeight: '2.5' }}
                            onClick={handleSend}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
}

export default AddStar