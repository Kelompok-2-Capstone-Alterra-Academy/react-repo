import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from '../SidebarContent/SidebarContent.module.css';

const SidebarContent = ({ folderData, onClickFolder, selectedId }) => {
	const handleClick = (id) => {
		onClickFolder(id);
	};

	return (
		<div className={styles.container}>
			{folderData.folders?.map((data, index) => (
				<Link
					key={index}
					style={{ textDecoration: 'none', cursor: 'pointer' }}
					onClick={() => handleClick(data.ID)}
					className={data.ID == selectedId ? styles.listItemActive : styles.listItem}>
					<FontAwesomeIcon
						icon={data.ID == selectedId ? faFolderOpen : faFolder}
						className={data.ID == selectedId ? styles.iconActive : styles.icon}
					/>
					<span className={data.ID == selectedId ? styles.descriptionActive : styles.description}>
						{data.folder_name}
					</span>
				</Link>
			))}
		</div>
	);
};

export default SidebarContent;
