// import styles from '../../App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolderOpen, faFile, faLink } from '@fortawesome/free-solid-svg-icons';
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
                            <b>15</b> File, <b>20px</b> Folder
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
                        },
                    }} {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3"><FontAwesomeIcon style={{ marginLeft: 8, marginRight: '20px' }} icon={faFile} />File</Typography></MenuItem>
                        <Divider sx={{ bgcolor: "#2196F3" }} />
                        <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3"><FontAwesomeIcon style={{ marginLeft: 8, marginRight: '20px' }} icon={faFolderOpen} />Folder</Typography></MenuItem>
                        <Divider sx={{ bgcolor: "#2196F3" }} />
                        <MenuItem onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3"><FontAwesomeIcon style={{ marginLeft: 8, marginRight: '20px' }} icon={faLink} />Attach Link</Typography></MenuItem>
                    </Menu>
                </>
            )}
        </PopupState>
    )
}

export default HeaderDropdown