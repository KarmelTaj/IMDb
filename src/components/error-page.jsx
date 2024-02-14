import { Box, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import Link from '@mui/material/Link';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Box sx={{
            margin: 'auto',
            width: '1008px',
            backgroundColor: '#D4D9DD',
            height: '100vh'
        }}>
            <Box sx={{
                height: '100%',
                backgroundColor: '#fff',
                borderLeft: '1px solid #999999',
                borderRight: '1px solid #999999',
                boxShadow: '0 0 5px 5px #C5CACD'
            }}>
                <Typography variant="h4" sx={{ color: '#999999', fontSize: '17.5px', p: '30px 70px 20px' }}>
                    The requested URL was not found on our server.
                    <Link href="/" variant="h4  " underline="none" sx={{ color: '#136CB20', fontSize: '17.5px', fontWeight: 400 }}>
                        {" Go to the homepage "}
                    </Link>
                    »
                </Typography>
                <Box sx={{
                    backgroundColor: 'rgb(222, 202, 22)',
                    backgroundPositionX: '0%',
                    backgroundPositionY: '0%',
                    backgroundRepeat: 'repeat',
                    backgroundAttachment: 'scroll',
                    backgroundImage: 'none',
                    backgroundSize: 'auto',
                    backgroundOrigin: 'padding-box',
                    backgroundClip: 'border-box',
                    border: '1px solid #DECA16',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    mx: '70px',
                    p: '50px',
                }}>
                    <Box component='div' sx={{ display: 'inline-block', verticalAlign: 'middle', color: '#BFAD13' }}>
                        <Typography variant="body1" sx={{ fontSize: '100px', lineHeight: '50px', marginTop: '8px' }}>
                            404
                            <br />
                            <span style={{ fontSize: '50px', color: '#BFAD13', lineHeight: '50px', fontWeight: 'bold' }}>ERROR</span>
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ display: 'inline-block', verticalAlign: 'middle', color: '#fff', fontSize: '30px', lineHeight: '1.35em', pl: '50px', width: '500px', fontWeight: 'bold' }}>
                        I am Jack's missing page.
                    </Typography>
                </Box>
                <Box sx={{
                    borderColor: '#DECA16 transparent transparent transparent',
                    borderStyle: 'solid',
                    borderWidth: '21px 0px 0px 32px',
                    height: 0,
                    left: '700px',
                    lineHeight: 0,
                    position: 'relative',
                    top: '-1px',
                    width: 0
                }}></Box>
                <Typography variant="body2" sx={{
                    color: '#999999',
                    float: 'right',
                    fontSize: '14px',
                    fontStyle: 'italic',
                    p: '10px 70px 36px'
                }}>
                    <span style={{
                        color: '#999999',
                        fontSize: '14px',
                        fontStyle: 'italic'
                    }}>The Narrator, </span>
                    <Link href="/" variant="h5  " underline="none" sx={{ color: '#136CB2', fontSize: '14px', fontStyle: 'italic' }}>
                        {" Fight Club (1999)"}
                    </Link>
                </Typography>
            </Box >
        </Box>
    );
}

export default ErrorPage