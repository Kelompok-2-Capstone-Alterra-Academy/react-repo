import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgFolder from '../../../public/image/icon-folder.png'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


const CardFolder = () => {
    return (

        <Card elevation={0} sx={{ maxWidth: 200, minHeight: 170, borderRadius: 2.5, marginBottom: '10px', border: '2px solid #f5f5f5' }}>
            <div style={{ paddingTop: 20, display: "flex" }}>
                <CardMedia
                    component="img"
                    alt="img-folder"
                    height="77"
                    image={imgFolder}
                    style={{ paddingLeft: 15, width: 77 }}
                />
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <>
                            <MoreHorizIcon variant="contained" {...bindTrigger(popupState)} style={{ marginLeft: 70, color: '#E0E0E0', fontSize: 28 }} />
                            <Menu PaperProps={{
                                style: {
                                    // left: '50%',
                                    transform: 'translateX(-71%) translateY(-1%)',
                                },
                                elevation: 0,
                                sx: {
                                    bgcolor: "#F0FAFF",
                                    overflow: 'visible',
                                    ml: '0px',
                                    // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    // mt: 1.5,
                                    // '& .MuiAvatar-root': {
                                    //     width: 32,
                                    //     height: 32,
                                    //     ml: -0.5,
                                    //     mr: 1,
                                    // },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: '#F0FAFF',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}{...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3">File</Typography></MenuItem>
                                <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3">Modul</Typography></MenuItem>
                                <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3">Attachment</Typography></MenuItem>
                            </Menu>
                        </>
                    )}
                </PopupState>
            </div>
            <CardContent>
                <Typography style={{ fontSize: 14 }} gutterBottom variant="h6" component="div">
                    Matematika Dasar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widesp
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardFolder