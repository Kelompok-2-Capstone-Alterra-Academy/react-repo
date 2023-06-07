import { faArrowLeft, faFolderOpen, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { FILE } from '../constans';
import styles from './MediaModal.module.css';

export default function MediaModal({ data, show, onClose, onSubmit, type }) {
	const [folderList, setFolderList] = useState([]);
	const [searchedName, setSearchedName] = useState('');
	const [selectedFolder, setSelectedFolder] = useState('');

	useEffect(() => {
		if (data) {
			setFolderList(data);
		}
		setSearchedName('');
		setSelectedFolder('');
	}, [show]);

	useEffect(() => {
		filterFolderList(searchedName);
	}, [searchedName, show]);

	const filterFolderList = (searchedName) => {
		const filteredList = data.filter((item) =>
			item.name.toLowerCase().includes(searchedName.toLowerCase())
		);
		setFolderList(filteredList);
	};

	return (
		<Modal open={show} onClose={onClose}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<div className={styles.modalTitle}>
						<div>
							<FontAwesomeIcon
								icon={faArrowLeft}
								className={selectedFolder ? styles.modalBackIcon : styles.modalBackIconDisabled}
								onClick={() => {
									if (selectedFolder) {
										setSelectedFolder('');
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
							placeholder="Cari nama folder"
							onChange={(e) => {
								setSearchedName(e.target.value);
							}}
						/>
					</div>
					<div className={styles.modalBreadcrumb}>
						<span
							className={styles.headerGrey}
							onClick={() => {
								setSelectedFolder('');
							}}>
							Modul /{' '}
						</span>
						<span
							className={selectedFolder ? styles.headerGrey : styles.headerBlack}
							onClick={() => {
								setSelectedFolder('');
							}}>
							Folder dan File
						</span>
						{selectedFolder && <span className={styles.headerBlack}> / {selectedFolder}</span>}
					</div>
				</div>
				<div className={styles.modalContent}>
					{selectedFolder ? (
						<table className={styles.modalTable}>
							<thead className={styles.modalTableHead}>
								<tr>
									<th>Pilih</th>
									<th>Nama File</th>
									<th>Ditambahkan Oleh</th>
								</tr>
							</thead>
							<tbody className={styles.modalTableBody}>
								{FILE[type == 'video' ? 'video' : 'file']?.map((file) => {
									return (
										<tr key={file.id} className={styles.modalTableBodyRow}>
											<td>
												<span
													className={styles.modalTableSelect}
													onClick={() => {
														onSubmit({
															src: file.src,
															name: file.name,
														});
													}}>
													Pilih
												</span>
											</td>
											<td>{file.name}</td>
											<td className={styles.authorContainer}>
												<img src={file.ava} alt="author" className={styles.authorImage} />
												{file.author}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					) : (
						<div className={styles.modalContentBody}>
							{folderList.map((folder) => {
								return (
									<div
										className={styles.modalContentCard}
										key={folder.id}
										onClick={() => {
											setSelectedFolder(folder.name);
										}}>
										<FontAwesomeIcon icon={faFolderOpen} className={styles.modalContentCardIcon} />
										<span>{folder.name}</span>
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
