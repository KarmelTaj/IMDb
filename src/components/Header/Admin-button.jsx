import React from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from "react-router-dom";

const AdminButton = () => {
    const navigate = useNavigate();

    const handleSentToAdmin = () => {
        navigate("/admin")
    }

    return <Tooltip TransitionComponent={Zoom} title={"Admin Dashboard"} >
            <IconButton onClick={handleSentToAdmin} aria-label="admin-page" size="large" color="icon" >
                    <AdminPanelSettingsIcon sx={{ width: "2em", height: "2em" }} />
            </IconButton>
        </Tooltip>
}

export default AdminButton