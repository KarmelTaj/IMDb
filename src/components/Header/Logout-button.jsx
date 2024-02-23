import React from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = ({ handleLogout }) => {

    return <Tooltip TransitionComponent={Zoom} title="Log Out">
        <IconButton aria-label="logout" size="large" color="icon" onClick={handleLogout} >
            <LogoutIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
    </Tooltip>
}

export default LogoutButton