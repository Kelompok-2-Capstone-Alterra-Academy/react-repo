// import styles from '../../App.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { Button } from '../../components';
import styles from '../HeaderDropdown/HeaderDropdown.module.css';

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
							variant="contained"
							{...bindTrigger(popupState)}>
							<FontAwesomeIcon icon={faPlus} className={styles.headerButtonIcon} />
							Tambah Modul
						</Button>
					</div>
					<Menu style={{ width: 200, color: 'blue' }} {...bindMenu(popupState)}>
						<MenuItem onClick={popupState.close}>Profile</MenuItem>
						<MenuItem onClick={popupState.close}>My account</MenuItem>
					</Menu>
				</>
			)}
		</PopupState>
	);
};

export default HeaderDropdown;
