import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import AddMovie from './Add-Movie';
import AddStar from './Add-Star';
import DeleteMovie from './Delete-Movie';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './Admin.css'
import { adminAdmin as theme } from '../../utils/theme';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ height: '100%', width: '100%' }}>{children}</Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Admin = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const userAuth = JSON.parse(localStorage.getItem("userAuth"));
        // Update the URL based on the selected tab
        if (value === 0) {
            navigate('/admin/add-movie', { replace: true });
            if (userAuth === null || !userAuth.isadmin) {
                navigate('/');
            }
        } else if (value === 1) {
            navigate('/admin/add-star', { replace: true });
            if (userAuth === null || !userAuth.isadmin) {
                navigate('/');
            }
        } else if (value === 2) {
            navigate('/admin/delete-movie', { replace: true });
            if (userAuth === null || !userAuth.isadmin) {
                navigate('/');
            }
        }
    }, [value, navigate]);

    const navigateToHome = () => {
        navigate("/");
    };

    return (
        <ThemeProvider theme={theme}>
            <Fab variant="circular" color="primary" size="large" onClick={navigateToHome} sx={{ position: "absolute", top: '40px', right: '60px', width: '72px', height: '72px' }}>
                <HomeIcon sx={{ height: '35px', width: '35px' }} />
            </Fab>
            <Box
                sx={{ flexGrow: 1, bgcolor: theme.palette.backgrounds.contrastText, display: 'flex', height: "100vh" }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', width: '16em', bgcolor: theme.palette.backgrounds.tab }}
                >
                    <Tab label="Add Movie" {...a11yProps(0)} sx={{ color: theme.palette.backgrounds.contrastText }} />
                    <Tab label="Add Star" {...a11yProps(1)} sx={{ color: theme.palette.backgrounds.contrastText }} />
                    <Tab label="Delete Movie" {...a11yProps(2)} sx={{ color: theme.palette.backgrounds.contrastText }} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {value === 0 && <AddMovie />}
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <AddStar />
                </TabPanel>
                <TabPanel value={value} index={2} >
                    <DeleteMovie />
                </TabPanel>
            </Box>
        </ThemeProvider>
    );
}

export default Admin;
