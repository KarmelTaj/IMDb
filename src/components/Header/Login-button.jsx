import React from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    }

    return <Tooltip TransitionComponent={Zoom} title="Go to your account" >
        <IconButton aria-label="login" size="large" color="icon" onClick={handleClick} >
            <AccountCircleIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
    </Tooltip>
}

export default LoginButton