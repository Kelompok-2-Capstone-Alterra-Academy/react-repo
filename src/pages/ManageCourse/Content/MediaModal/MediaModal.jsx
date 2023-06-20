import { faArrowLeft, faFolderOpen, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { toast } from 'react-toastify';
import { getAttachment } from '../../../../clients';
import styles from './MediaModal.module.css';

export default function MediaModal({ show, onClose, onSubmit, data }) {
	const [displayedFolderList, setDisplayedFolderList] = useState([]);
	const [attachmentList, setAttachmentList] = useState([]);
	const [displayedAttachmentList, setDisplayedAttachmentList] = useState([]);

	const [searchedName, setSearchedName] = useState('');
	const [selectedFolderId, setSelectedFolderId] = useState('');
	const [selectedFolderName, setSelectedFolderName] = useState('');

	const [loadingAttachment, setLoadingAttachment] = useState(false);

	useEffect(() => {
		setSearchedName('');
		setSelectedFolderId('');
		setSelectedFolderName('');
	}, [show]);

	useEffect(() => {
		filterFolderList(searchedName);
		filterAttachmentList(searchedName);
	}, [searchedName, show]);

	useEffect(() => {
		if (selectedFolderId) {
			setLoadingAttachment(true);
			console.log(selectedFolderId);
			getAttachment(selectedFolderId)
				.then((res) => {
					setAttachmentList(res.data.data);
					setDisplayedAttachmentList(res.data.data);
				})
				.catch((err) => {
					toast.error(err.response.data.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
				})
				.finally(() => {
					setLoadingAttachment(false);
				});
		}
	}, [selectedFolderId]);

	const filterFolderList = (searchedName) => {
		const filteredList = data.filter((folder) =>
			folder.folder_name.toLowerCase().includes(searchedName.toLowerCase())
		);
		setDisplayedFolderList(filteredList);
	};

	const filterAttachmentList = (searchedName) => {
		const filteredList = attachmentList.filter((file) =>
			file.attachment_name.toLowerCase().includes(searchedName.toLowerCase())
		);
		setDisplayedAttachmentList(filteredList);
	};

	return (
		<Modal open={show} onClose={onClose}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<div className={styles.modalTitle}>
						<div>
							<FontAwesomeIcon
								icon={faArrowLeft}
								className={selectedFolderId ? styles.modalBackIcon : styles.modalBackIconDisabled}
								onClick={() => {
									if (selectedFolderId) {
										setSelectedFolderName('');
										setSelectedFolderId('');
										setSearchedName('');
									}
								}}
							/>
							<span>Pilih File</span>
						</div>
						<FontAwesomeIcon icon={faXmark} className={styles.modalCloseIcon} onClick={onClose} />
					</div>
					<div className={styles.modalSearch}>
						<FontAwesomeIcon icon={faSearch} className={styles.modalSearchIcon} />
						<input
							type="text"
							placeholder={selectedFolderId ? 'Cari nama file' : 'Cari nama folder'}
							onChange={(e) => {
								setSearchedName(e.target.value);
							}}
							value={searchedName}
						/>
					</div>
					<div className={styles.modalBreadcrumb}>
						<span
							className={styles.headerGrey}
							onClick={() => {
								setSelectedFolderId('');
								setSelectedFolderName('');
								setSearchedName('');
							}}>
							Modul /{' '}
						</span>
						<span
							className={selectedFolderName ? styles.headerGrey : styles.headerBlack}
							onClick={() => {
								setSelectedFolderId('');
								setSelectedFolderName('');
								setSearchedName('');
							}}>
							Folder dan File
						</span>
						{selectedFolderName && (
							<span className={styles.headerBlack}> / {selectedFolderName}</span>
						)}
					</div>
				</div>
				<div className={styles.modalContent}>
					{selectedFolderId ? (
						loadingAttachment ? (
							<LoopCircleLoading size="large" color="#2196f3" />
						) : (
							<table className={styles.modalTable}>
								<thead className={styles.modalTableHead}>
									<tr>
										<th>Pilih</th>
										<th>Nama File</th>
										<th>Ditambahkan Oleh</th>
									</tr>
								</thead>
								<tbody className={styles.modalTableBody}>
									{displayedAttachmentList.map((file) => {
										return (
											<tr key={file.ID} className={styles.modalTableBodyRow}>
												<td>
													<span
														className={styles.modalTableSelect}
														onClick={() => {
															onSubmit(file);
														}}>
														Pilih
													</span>
												</td>
												<td>{file.attachment_name}</td>
												<td className={styles.authorContainer}>
													<img
														src={`https://i.pravatar.cc/150?img=${file.ID}`}
														alt="author"
														className={styles.authorImage}
													/>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)
					) : (
						<div className={styles.modalContentBody}>
							{displayedFolderList.map((folder) => {
								return (
									<div
										className={styles.modalContentCard}
										key={folder.ID}
										onClick={() => {
											setSelectedFolderId(folder.ID);
											setSelectedFolderName(folder.folder_name);
											setSearchedName('');
										}}>
										<FontAwesomeIcon icon={faFolderOpen} className={styles.modalContentCardIcon} />
										<span>{folder.folder_name || '-'}</span>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
}
