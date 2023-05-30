import { Link } from 'react-router-dom';
import { faCommentDots, faUsers, faBookOpen, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../Sidebar/Sidebar.module.css';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.header}>
				<Link style={{ textDecoration: 'none' }} className={styles.logo}>
					<span className={styles.descriptionHeader}>StarMyDashboard</span>
				</Link>
			</div>
			<div className={styles.main}>
				<Link style={{ textDecoration: 'none' }} to="/chat" className={styles.listItemActive}>
					<FontAwesomeIcon icon={faCommentDots} className={styles.icon} />
					<span className={styles.description}>Chat</span>
				</Link>
				<Link style={{ textDecoration: 'none' }} to="/learning/modul" className={styles.listItem}>
					<FontAwesomeIcon icon={faUsers} className={styles.icon} />
					<span className={styles.description}>Pelanggan</span>
				</Link>
				<Link style={{ textDecoration: 'none' }} to="/learning/modul" className={styles.listItem}>
					<FontAwesomeIcon icon={faBookOpen} className={styles.icon} />
					<span className={styles.description}>Pembelajaran</span>
				</Link>
				<Link style={{ textDecoration: 'none' }} className={styles.listCourse}>
					<span>Kursus Saya</span>
					<KeyboardArrowDownIcon style={{ color: '#212121' }} />
				</Link>
				<Link style={{ textDecoration: 'none' }} className={styles.logoutItem}>
					<FontAwesomeIcon icon={faPowerOff} className={styles.icon} />
					<span className={styles.description}>Keluar</span>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
