import { Link } from 'react-router-dom';
import { faCommentDots, faUsers, faBookOpen, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Sidebar.module.css';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const Sidebar = () => {

	return (
		<div className={styles.sidebar}>
			<div className={styles.header}>
				<div className={styles.listItem}>
					<Link style={{ textDecoration: 'none' }}>
						<p className={styles.descriptionHeader}>StarMyDashboard</p>
					</Link>

				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.listItemActive}>

					<Link style={{ textDecoration: 'none' }}>
						<FontAwesomeIcon icon={faCommentDots} style={{ color: '#FFFFFF' }} className={styles.icon} />
						<span className={styles.description}>Chat</span>
					</Link>
				</div>
				<div className={styles.listItem}>

					<Link style={{ textDecoration: 'none' }}>
						<FontAwesomeIcon icon={faUsers} style={{ color: '#FFFFFF' }} className={styles.icon} />
						<span className={styles.description}>Pelanggan</span>
					</Link>
				</div>
				<div className={styles.listItem}>

					<Link style={{ textDecoration: 'none' }}>
						<FontAwesomeIcon icon={faBookOpen} style={{ color: '#FFFFFF' }} className={styles.icon} />
						<span className={styles.description}>Pembelajaran</span>
					</Link>
				</div>
				<div className={styles.listItem}>

					<Link style={{ textDecoration: 'none' }}>
						<Button
							style={{
								padding: '12px 10px',
								borderRadius: '8px',
								width: '210px',
								backgroundColor: '#FFFFFF',
								boxSizing: 'border-box',
								textTransform: 'none'
							}}
							id="demo-customized-button"
							aria-haspopup="true"
							variant="contained"
							disableElevation
							endIcon={<KeyboardArrowDownIcon style={{ color: '#2196F3' }} />}
						>
							<span style={{ color: '#212121', fontSize: 16, marginRight: 30 }}>Kursus Saya</span>
						</Button>
					</Link>
				</div>
				<div className={styles.listItem}>

					<Link style={{ textDecoration: 'none' }}>
						<button style={{
							padding: '12px 10px',
							borderRadius: '8px',
							width: '210px',
							backgroundColor: '#4161FF',
							border: '1px solid #FFFFFF',
							boxSizing: 'border-box'
						}}><FontAwesomeIcon icon={faPowerOff} style={{ color: '#FFFFFF', marginRight: 13 }} /><span className={styles.description} style={{ color: '#FFFFFF' }}>Keluar</span></button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;