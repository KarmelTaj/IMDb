import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ py: 1.5 }}>
                <Toolbar variant='dense' sx={{p: 0}}>
                    <LiveTvIcon fontSize='large' edge="start" color="inherit" sx={{ mr: 3 }}/>
                    <Typography variant="h6" component="div">
                        Movies
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default Header;