// import styles from '../../App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFolderOpen, faFile, faLink } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import styles from "../HeaderDropdown/HeaderDropdown.module.css";
import Divider from '@mui/material/Divider';
import FormModal from '../FormModal/FormModal';
import Modal from '@mui/material/Modal';
import { useState } from 'react';



const HeaderDropdown = () => {
    const [showFormModalFolder, setShowFormModalFolder] = useState(false);
    const [showFormModalLink, setShowFormModalLink] = useState(false);

    return (
        <>
            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <>
                        <div className={styles.header}>
                            <span className={styles.headerTitle}>
                                <b>15</b> File, <b>20</b> Folder
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
                            // elevation: 0,
                            sx: {
                                width: 200,
                                borderRadius: '8px',
                                border: '1px solid #2196F3',
                                marginTop: '10px',
                            },
                        }} {...bindMenu(popupState)}>
                            <MenuItem sx={[{ '&:hover': { backgroundColor: '#2196F3', color: '#FFFFFF', transition: '0.3s ease-in-out' }, color: "#2196F3" }]} color="#2196F3" onClick={popupState.close}><FontAwesomeIcon style={{ marginLeft: 8, marginRight: '20px' }} icon={faFile} />File</MenuItem>
                            <Divider sx={{ bgcolor: "#2196F3", padding: '0px' }} />
                            <MenuItem sx={[{ '&:hover': { backgroundColor: '#2196F3', color: '#FFFFFF', transition: '0.3s ease-in-out' }, color: "#2196F3" }]} color="#2196F3" onClick={() => setShowFormModalFolder(true)}><FontAwesomeIcon style={{ marginLeft: 8, marginRight: '20px' }} icon={faFolderOpen} />Folder</MenuItem>
                            <Divider sx={{ bgcolor: "#2196F3" }} />
                            <MenuItem sx={[{ '&:hover': { backgroundColor: '#2196F3', color: '#FFFFFF', transition: '0.3s ease-in-out' }, color: "#2196F3" }]} color="#2196F3" onClick={() => setShowFormModalLink(true)}><FontAwesomeIcon style={{ marginLeft: 8, marginRight: '20px' }} icon={faLink} />Attach Link</MenuItem>
                        </Menu>
                    </>
                )}
            </PopupState>
            <Modal open={showFormModalFolder} onClose={() => setShowFormModalFolder(false)}>
                <FormModal
                    header="Folder Baru"
                    placeholder="Nama Folder Baru"
                    closeFunction={() => {
                        setShowFormModalFolder(false);
                    }}
                />
            </Modal>
            <Modal open={showFormModalLink} onClose={() => setShowFormModalLink(false)}>
                <FormModal
                    header="Masukan Link Video"
                    placeholder="Link Video"
                    closeFunction={() => {
                        setShowFormModalLink(false);
                    }}
                />
            </Modal>
        </>
    )
}

export default HeaderDropdown