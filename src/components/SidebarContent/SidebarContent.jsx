import {
	faFileEdit,
	faFolder,
	faFolderOpen,
	faInfoCircle,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { delFolder, putFolder } from '../../clients';
import { deleteFolder, updateFolder } from '../../redux/actions/folderActions';
import { Button } from '../Button';
import { ConfirmationModal } from '../ConfirmationModal';
import styles from '../SidebarContent/SidebarContent.module.css';

const SidebarContent = ({ folderData, onClickFolder, selectedId }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [validation, setValidation] = useState(false);

	const [deletedId, setDeletedId] = useState(null);
	const [editedFolder, setEditedFolder] = useState(null);

	const [folderName, setNewfolderName] = useState('');

	const dispatch = useDispatch();

	const handleClick = (id) => {
		onClickFolder(id);
	};

	useEffect(() => {
		if (
			folderName !== '' &&
			!folderData.find((item) => item.folder_name.toLowerCase() === folderName.toLowerCase())
		) {
			setValidation(true);
		} else {
			setValidation(false);
		}
	}, [folderName]);

	useEffect(() => {
		if (editedFolder) {
			setNewfolderName(editedFolder.name);
		}
	}, [editedFolder]);

	return (
		<div className={styles.container}>
			{folderData?.map((data, index) => (
				<Link
					key={index}
					style={{ textDecoration: 'none', cursor: 'pointer' }}
					onClick={() => handleClick(data.ID)}
					className={data.ID == selectedId ? styles.listItemActive : styles.listItem}>
					<span>
						<FontAwesomeIcon
							icon={data.ID == selectedId ? faFolderOpen : faFolder}
							className={data.ID == selectedId ? styles.iconActive : styles.icon}
						/>
						<span className={data.ID == selectedId ? styles.descriptionActive : styles.description}>
							{data.folder_name}
						</span>
					</span>
					<div>
						<FontAwesomeIcon
							icon={faFileEdit}
							className={data.ID == selectedId ? styles.iconEditActive : styles.iconEdit}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setEditedFolder({
									id: data.ID,
									name: data.folder_name,
								});
								setShowEditModal(true);
							}}
						/>
						<FontAwesomeIcon
							icon={faTrashAlt}
							className={data.ID == selectedId ? styles.iconDeleteActive : styles.iconDelete}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setDeletedId(data.ID);
								setShowDeleteModal(true);
							}}
						/>
					</div>
				</Link>
			))}
			<ConfirmationModal
				title="Hapus Folder"
				confirmationText="Apakah anda yakin ingin menghapus folder ini?"
				show={showDeleteModal}
				image={'/image/quiz-delete.png'}
				primaryButtonName={'Hapus'}
				secondaryButtonName={'Batal'}
				onPrimaryButtonClick={() => {
					delFolder(deletedId)
						.then((res) => {
							toast.success(res.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(deleteFolder(deletedId));
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						})
						.finally(() => {
							setShowDeleteModal(false);
						});
				}}
				onSecondaryButtonClick={() => {
					setShowDeleteModal(false);
				}}
			/>
			<Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
				<div className={styles.modalContainer}>
					<span className={styles.modalTitle}>Form Edit Nama Folder</span>
					<div className={styles.formGroup}>
						<span className={styles.label}>Nama Folder</span>
						<input
							type="text"
							className={styles.input}
							value={folderName}
							placeholder="Masukkan Nama Folder"
							onChange={(e) => setNewfolderName(e.target.value)}
						/>
						<span className={styles.helpText}>
							<FontAwesomeIcon icon={faInfoCircle} className={styles.helpTextIcon} />
							Field ini harus diisi
						</span>
						<span className={styles.helpText}>
							<FontAwesomeIcon icon={faInfoCircle} className={styles.helpTextIcon} />
							Nama folder tidak boleh sama
						</span>
					</div>

					<div className={styles.footer}>
						<Button
							type="Secondary"
							onClick={() => {
								setNewfolderName('');
								setShowEditModal(false);
							}}>
							Batal
						</Button>
						<Button
							type={validation ? 'Primary' : 'Disabled'}
							onClick={() => {
								putFolder({
									id: editedFolder.id,
									data: {
										folder_name: folderName,
									},
								})
									.then((res) => {
										toast.success(res.data.message, {
											position: toast.POSITION.TOP_RIGHT,
										});
										dispatch(
											updateFolder({
												ID: editedFolder.id,
												folder_name: folderName,
											})
										);
									})
									.catch((err) => {
										toast.error(err.response.data.message, {
											position: toast.POSITION.TOP_RIGHT,
										});
									})
									.finally(() => {
										setShowEditModal(false);
										setNewfolderName('');
									});
							}}>
							Simpan
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default SidebarContent;
