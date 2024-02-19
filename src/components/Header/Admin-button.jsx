import React from "react";
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AdminButton = () => {

    return <Link href={"/admin"} >
        <Tooltip TransitionComponent={Zoom} title={"Admin Dashboard"} >
            <IconButton aria-label="admin-page" size="large" color="icon" >
                    <AdminPanelSettingsIcon sx={{ width: "2em", height: "2em" }} />
            </IconButton>
        </Tooltip>
    </Link>
}

export default AdminButton