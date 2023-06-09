import { faChevronDown, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { Select } from '../../../../components';
import { useClickOutside } from '../../../../hooks';
import styles from './LinkModal.module.css';

export default function LinkModal({ data, show, onClose, onSubmit }) {
	const [quizLinkSearched, setQuizLinkSearched] = useState('');
	const [quizLinkShowPerPage, setQuizLinkShowPerPage] = useState(4);
	const [isSelectShowPerPage, setIsSelectShowPerPage] = useState(false);
	const [quizLinkList, setQuizLinkList] = useState([]);

	const containerRef = useClickOutside(() => {
		setIsSelectShowPerPage(false);
	});

	useEffect(() => {
		if (data) {
			setQuizLinkList(data);
		}
		setQuizLinkSearched('');
		setQuizLinkShowPerPage(4);
	}, [show]);

	useEffect(() => {
		filterQuizLinkList(quizLinkSearched, quizLinkShowPerPage);
	}, [quizLinkSearched, quizLinkShowPerPage, show]);

	const filterQuizLinkList = (searchedName, showPerPage) => {
		const filteredList = data.filter((item) => item.name.toLowerCase().includes(searchedName));
		setQuizLinkList(filteredList.slice(0, showPerPage));
	};

	return (
		<Modal open={show} onClose={onClose}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<div className={styles.modalTitle}>
						<span>Pilih Kuis</span>
						<FontAwesomeIcon icon={faXmark} className={styles.modalCloseIcon} onClick={onClose} />
					</div>
					<div className={styles.modalSearch}>
						<FontAwesomeIcon icon={faSearch} className={styles.modalSearchIcon} />
						<input
							type="text"
							placeholder="Cari nama link"
							onChange={(e) => {
								setQuizLinkSearched(e.target.value);
							}}
							value={quizLinkSearched}
						/>
					</div>
				</div>
				<div className={styles.modalContent}>
					<div className={styles.modalContentHeader}>
						<span>Tampilkan</span>
						<div
							className={styles.modalContentSelectContainer}
							onClick={() => setIsSelectShowPerPage(!isSelectShowPerPage)}
							ref={containerRef}>
							{quizLinkShowPerPage}
							<FontAwesomeIcon icon={faChevronDown} className={styles.modalContentSelectIcon} />
							{isSelectShowPerPage && (
								<Select
									isShow={isSelectShowPerPage}
									className={styles.modalContentSelect}
									options={{
										title: 'Tampilkan',
										data: [
											{ id: 1, option: 4 },
											{ id: 2, option: 8 },
											{ id: 3, option: 12 },
										],
									}}
									handleSelected={(id) => {
										setQuizLinkShowPerPage(id === 1 ? 4 : id === 2 ? 8 : 12);
										setIsSelectShowPerPage(false);
									}}
								/>
							)}
						</div>
						<span>Per Page</span>
					</div>
					<div className={styles.modalContentBody}>
						<table className={styles.modalTable}>
							<thead className={styles.modalTableHead}>
								<tr>
									<th>Pilih</th>
									<th>Nama Link</th>
									<th>Preview Link</th>
								</tr>
							</thead>
							<tbody className={styles.modalTableBody}>
								{quizLinkList?.map((link) => {
									return (
										<tr key={link.id} className={styles.modalTableBodyRow}>
											<td>
												<span
													className={styles.modalTableSelect}
													onClick={() => {
														onSubmit(link);
													}}>
													Pilih
												</span>
											</td>
											<td>{link.name}</td>
											<td>{link.link}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Modal>
	);
}
