import { faArrowLeft, faFolderOpen, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { toast } from 'react-toastify';
import { getAttachment } from '../../../../clients';
import { truncateString } from '../../../../utilities/string';
import styles from './MediaModal.module.css';

export default function MediaModal({ show, onClose, onSubmit, data, type }) {
	const [displayedFolderList, setDisplayedFolderList] = useState([]);
	const [attachmentList, setAttachmentList] = useState([]);
	const [displayedAttachmentList, setDisplayedAttachmentList] = useState([]);

	const [searchedName, setSearchedName] = useState('');
	const [selectedFolderId, setSelectedFolderId] = useState('');
	const [selectedFolderName, setSelectedFolderName] = useState('');

	const [isForVideo, setIsForVideo] = useState(false);
	const [loadingAttachment, setLoadingAttachment] = useState(false);

	useEffect(() => {
		setSearchedName('');
		setSelectedFolderId('');
		setSelectedFolderName('');
		if (type == 'video') {
			setIsForVideo(true);
		} else {
			setIsForVideo(false);
		}
	}, [show]);

	useEffect(() => {
		filterFolderList(searchedName);
		filterAttachmentList(searchedName);
	}, [searchedName, show]);

	useEffect(() => {
		if (selectedFolderId) {
			setLoadingAttachment(true);
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
			<div id="modalContainer" className={styles.modalContainer}>
				<div id="modalHeader" className={styles.modalHeader}>
					<div id="modalTitle" className={styles.modalTitle}>
						<div>
							<FontAwesomeIcon
								id="modalBackIcon"
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
						<FontAwesomeIcon
							id="modalCloseIcon"
							icon={faXmark}
							className={styles.modalCloseIcon}
							onClick={onClose}
						/>
					</div>
					<div id="modalSearch" className={styles.modalSearch}>
						<FontAwesomeIcon
							id="modalSearchIcon"
							icon={faSearch}
							className={styles.modalSearchIcon}
						/>
						<input
							id="modalSearchInput"
							type="text"
							placeholder={selectedFolderId ? 'Cari nama file' : 'Cari nama folder'}
							onChange={(e) => {
								setSearchedName(e.target.value);
							}}
							value={searchedName}
						/>
					</div>
					<div id="modalBreadcrumb" className={styles.modalBreadcrumb}>
						<span
							id="modalBreadcrumbModul"
							className={styles.headerGrey}
							onClick={() => {
								setSelectedFolderId('');
								setSelectedFolderName('');
								setSearchedName('');
							}}>
							Modul /{' '}
						</span>
						<span
							id="modalBreadcrumbFolder"
							className={selectedFolderName ? styles.headerGrey : styles.headerBlack}
							onClick={() => {
								setSelectedFolderId('');
								setSelectedFolderName('');
								setSearchedName('');
							}}>
							Folder dan File
						</span>
						{selectedFolderName && (
							<span id="modalBreadcrumbSelectedFolder" className={styles.headerBlack}>
								{' '}
								/ {selectedFolderName}
							</span>
						)}
					</div>
				</div>
				<div id="modalContent" className={styles.modalContent}>
					{selectedFolderId ? (
						loadingAttachment ? (
							<LoopCircleLoading id="modalLoading" size="large" color="#2196f3" />
						) : (
							<table id="modalTable" className={styles.modalTable}>
								<thead id="modalTableHead" className={styles.modalTableHead}>
									<tr>
										<th>Pilih</th>
										<th>Nama File</th>
										<th>Deskripsi</th>
										<th>Ditambahkan Oleh</th>
									</tr>
								</thead>
								<tbody id="modalTableBody" className={styles.modalTableBody}>
									{displayedAttachmentList.map((file) => {
										if (isForVideo) {
											if (file.type === 'video') {
												console.log(file.folder.mentor.profile);
												return (
													<tr key={file.ID} className={styles.modalTableBodyRow}>
														<td>
															<span
																id="modalTableSelect"
																className={styles.modalTableSelect}
																onClick={() => {
																	onSubmit(file);
																}}>
																Pilih
															</span>
														</td>
														<td>{file.attachment_name}</td>
														<td className={styles.bodyTableCellDesc}>
															{truncateString(file.description, 100)}
														</td>
														<td className={styles.authorContainer}>
															<img
																src={
																	file.folder.mentor.profile ||
																	'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
																}
																alt="author"
																className={styles.authorImage}
															/>
														</td>
													</tr>
												);
											}
										} else {
											if (file.type !== 'video') {
												return (
													<tr key={file.ID} className={styles.modalTableBodyRow}>
														<td>
															<span
																id="modalTableSelect"
																className={styles.modalTableSelect}
																onClick={() => {
																	onSubmit(file);
																}}>
																Pilih
															</span>
														</td>
														<td>{file.attachment_name}</td>
														<td className={styles.bodyTableCellDesc}>
															{truncateString(file.description, 100)}
														</td>
														<td className={styles.authorContainer}>
															<img
																src={
																	file.folder.mentor.profile ||
																	'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
																}
																alt="author"
																className={styles.authorImage}
															/>
														</td>
													</tr>
												);
											}
										}
									})}
								</tbody>
							</table>
						)
					) : (
						<div id="modalContentBody" className={styles.modalContentBody}>
							{displayedFolderList.map((folder) => {
								return (
									<div
										id={`modalContentCard-${folder.ID}`}
										className={styles.modalContentCard}
										key={folder.ID}
										onClick={() => {
											setSelectedFolderId(folder.ID);
											setSelectedFolderName(folder.folder_name);
											setSearchedName('');
										}}>
										<FontAwesomeIcon
											id={`modalContentCardIcon-${folder.ID}`}
											icon={faFolderOpen}
											className={styles.modalContentCardIcon}
										/>
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
