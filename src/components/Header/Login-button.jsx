import React from "react";
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const LoginButton = ({ loggedIn }) => {

    const handleClick = () => {
        loggedIn ? localStorage.setItem("userAuth", null) : undefined;
    }

    return <Link href={loggedIn ? "/" : "/login"} >
        <Tooltip TransitionComponent={Zoom} title={loggedIn ? "Log Out" : "Go to your account"} >
            <IconButton aria-label="login" size="large" color="icon" onClick={handleClick} >
                {loggedIn ?
                    <LogoutIcon sx={{ width: "2em", height: "2em" }} />
                    :
                    <AccountCircleIcon sx={{ width: "2em", height: "2em" }} />}
            </IconButton>
        </Tooltip>
    </Link>
}

export default LoginButton