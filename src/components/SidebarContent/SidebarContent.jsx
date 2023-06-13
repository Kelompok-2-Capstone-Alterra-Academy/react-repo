import { Link } from 'react-router-dom';
import { faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../SidebarContent/SidebarContent.module.css';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SidebarContent = () => {
	return (
		<div className={styles.sidebar}>
			<div>
				<div className={styles.header}>
					<span>Folder (10)</span>
				</div>
				<div className={styles.main}>
					<Link style={{ textDecoration: 'none' }} to="/chat" className={styles.listItemActive}>
						<FontAwesomeIcon icon={faFolderOpen} className={styles.iconActive} />
						<span className={styles.description}>Matematika Dasar</span>
					</Link>
					<Link style={{ textDecoration: 'none' }} to="/learning/modul" className={styles.listItem}>
						<FontAwesomeIcon icon={faFolder} className={styles.icon} />
						<span>Kelipatan dan Faktor</span>
					</Link>
					<Link style={{ textDecoration: 'none' }} to="/learning/modul" className={styles.listItem}>
						<FontAwesomeIcon icon={faFolder} className={styles.icon} />
						<span>Operasi Pengukuran</span>
					</Link>
					<Link style={{ textDecoration: 'none' }} to="/learning/modul" className={styles.listItem}>
						<FontAwesomeIcon icon={faFolder} className={styles.icon} />
						<span>Operasi Perhitungan</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SidebarContent;
