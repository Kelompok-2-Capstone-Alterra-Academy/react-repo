import { Link } from 'react-router-dom';
import { faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../SidebarContent/SidebarContent.module.css';

const SidebarContent = ({ folderData }) => {
	console.log(folderData)
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
					{folderData.folders?.map((data, index) => (
						<div key={index}>
							<Link style={{ textDecoration: 'none' }} to="/learning/modul" className={styles.listItem}>
								<FontAwesomeIcon icon={faFolder} className={styles.icon} />
								<span>{data.folder_name}</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SidebarContent;
