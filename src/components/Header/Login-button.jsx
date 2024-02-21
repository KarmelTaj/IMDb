import React from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";




const LoginButton = ({ loggedIn }) => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate(loggedIn ? "/" : '/login');
    };
    const handleClick = () => {
        loggedIn ? localStorage.setItem("userAuth", null) : undefined;
    }

    return <Box onClick={navigateToHome}>
        <Tooltip TransitionComponent={Zoom} title={loggedIn ? "Log Out" : "Go to your account"} >
            <IconButton aria-label="login" size="large" color="icon" onClick={handleClick} >
                {loggedIn ?
                    <LogoutIcon sx={{ width: "2em", height: "2em" }} />
                    :
                    <AccountCircleIcon sx={{ width: "2em", height: "2em" }} />}
            </IconButton>
        </Tooltip>
    </Box>
}

export default LoginButton