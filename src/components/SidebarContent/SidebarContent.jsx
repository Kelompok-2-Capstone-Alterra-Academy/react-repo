import { Link, useNavigate, useParams } from 'react-router-dom';
import { faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../SidebarContent/SidebarContent.module.css';

const SidebarContent = ({ folderData }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const handleClick = (id) => {
		navigate(`/modul/${id}`)
		console.log(id)
		window.location.reload();
	}
	console.log(folderData)
	return (
		<div className={styles.sidebar}>
			<div>
				<div className={styles.header}>
					<span>Folder ({folderData.folders?.length})</span>
				</div>
				<div className={styles.main}>
					{folderData.folders?.map((data, index) => (
						<div key={index}>
							<Link style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => handleClick(data.ID)} className={data.ID == id ? styles.listItemActive : styles.listItem
							}>
								<FontAwesomeIcon icon={data.ID == id ? faFolderOpen : faFolder} className={data.ID == id ? styles.iconActive : styles.icon} />
								<span className={data.ID == id ? styles.descriptionActive : styles.description
								}>{data.folder_name}</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SidebarContent;
