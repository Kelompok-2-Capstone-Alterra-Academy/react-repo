// import styles from '../../App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import styles from "../HeaderDropdown/HeaderDropdown.module.css";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';



const HeaderDropdown = () => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <>
                    <div className={styles.header}>
                        <span className={styles.headerTitle}>
                            <b>15</b> File, <b>10</b> Folder
                        </span>
                        <Button
                            className={styles.headerButton}
                            type="Primary"
                            variant="contained" {...bindTrigger(popupState)}
                        >
                            <FontAwesomeIcon icon={faPlus} className={styles.headerButtonIcon} />
                            Tambah Modul
                        </Button>
                    </div>
                    <Menu PaperProps={{
                        elevation: 0,
                        sx: {
                            width: 200,
                            borderRadius: '8px',
                            border: '1px solid #2196F3',
                            marginTop: '10px',
                            // overflow: 'visible',
                            // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            // mt: 1.5,
                            // '& .MuiAvatar-root': {
                            //     width: 100,
                            //     height: 32,
                            //     ml: -0.5,
                            //     mr: 1,
                            // },
                            // '&:before': {
                            //     content: '""',
                            //     display: 'block',
                            //     position: 'absolute',
                            //     top: 0,
                            //     right: 14,
                            //     width: 10,
                            //     height: 10,
                            //     bgcolor: 'background.paper',
                            //     transform: 'translateY(-50%) rotate(45deg)',
                            //     zIndex: 0,
                            // },
                        },
                    }} {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3">File</Typography></MenuItem>
                        <Divider sx={{ bgcolor: "#2196F3" }} />
                        <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3">Modul</Typography></MenuItem>
                        <Divider sx={{ bgcolor: "#2196F3" }} />
                        <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3">Attachment</Typography></MenuItem>
                    </Menu>
                </>
            )}
        </PopupState>
    )
}

export default HeaderDropdown