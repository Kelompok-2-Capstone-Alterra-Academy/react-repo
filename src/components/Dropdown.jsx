import styles from '../App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Dropdown = () => {
    return (
        <Grid container style={{ width: '100%', margin: '0 0' }}>
            <Grid item xs={12}>
                <Paper elevation={2} style={{ height: '75%', margin: 10, borderRadius: 8 }}>
                    <div style={{ color: '#212121' }}>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <>
                                    <div style={{ dispaly: 'inline-flex', margin: 20 }}>
                                        <p style={{
                                            float: 'left',
                                            display: 'block',
                                            margin: 20
                                        }}>15 File, 10 Folder</p>
                                        <div style={{
                                            float: 'right',
                                            display: 'block',
                                            margin: 20
                                        }}>
                                            <Button variant="contained" {...bindTrigger(popupState)} className={styles.button} type="Primary">
                                                <FontAwesomeIcon icon={faPlus} className={styles.iconLeft} />
                                                <span>Tambah Modul</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <Menu style={{ width: 200, color: 'blue' }} {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>Profile</MenuItem>
                                        <MenuItem onClick={popupState.close}>My account</MenuItem>
                                    </Menu>
                                </>
                            )}
                        </PopupState>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Dropdown