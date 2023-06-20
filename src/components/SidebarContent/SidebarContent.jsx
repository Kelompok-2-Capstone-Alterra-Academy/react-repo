import { faFileEdit, faFolder, faFolderOpen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
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
	const [deletedId, setDeletedId] = useState(null);
	const [editedId, setEditedId] = useState(null);

	const [folderName, setFolderName] = useState('');

	const dispatch = useDispatch();

	const handleClick = (id) => {
		onClickFolder(id);
	};

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
								setEditedId(data.ID);
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
					<span className={styles.modalTitle}>Edit Nama Folder</span>
					<input
						type="text"
						className={styles.formInput}
						value={folderName}
						placeholder="Masukkan Nama Folder"
						onChange={(e) => setFolderName(e.target.value)}
					/>

					<div className={styles.footer}>
						<Button
							type="Secondary"
							onClick={() => {
								setFolderName('');
								setShowEditModal(false);
							}}>
							Batal
						</Button>
						<Button
							type="Primary"
							onClick={() => {
								putFolder({
									id: editedId,
									data: {
										folder_name: folderName,
									},
								})
									.then((res) => {
										toast.success(res.data.message, {
											position: toast.POSITION.TOP_RIGHT,
										});
										dispatch(updateFolder(res.data.data));
									})
									.catch((err) => {
										toast.error(err.response.data.message, {
											position: toast.POSITION.TOP_RIGHT,
										});
									})
									.finally(() => {
										setShowEditModal(false);
										setFolderName('');
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
