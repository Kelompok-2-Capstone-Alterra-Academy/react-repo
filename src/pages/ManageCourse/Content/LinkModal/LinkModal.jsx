import { faChevronDown, faChevronUp, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Select } from '../../../../components';
import { useClickOutside } from '../../../../hooks';
import { truncateString } from '../../../../utilities/string';
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
			setQuizLinkList(
				data.map((item) => {
					if (item.status != 'draft') return item;
				})
			);
		}
		setQuizLinkSearched('');
		setQuizLinkShowPerPage(4);
	}, [show]);

	useEffect(() => {
		filterQuizLinkList(quizLinkSearched, quizLinkShowPerPage);
	}, [quizLinkSearched, quizLinkShowPerPage, show]);

	const filterQuizLinkList = (searchedName, showPerPage) => {
		const filteredList = data.filter((item) =>
			item.attachment_name.toLowerCase().includes(searchedName.toLowerCase())
		);
		setQuizLinkList(filteredList.slice(0, showPerPage));
	};

	return (
		<Modal open={show} onClose={onClose}>
			<div id="modalContainer" className={styles.modalContainer}>
				<div id="modalHeader" className={styles.modalHeader}>
					<div id="modalTitle" className={styles.modalTitle}>
						<span>Pilih Kuis</span>
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
							placeholder="Cari nama link"
							onChange={(e) => {
								setQuizLinkSearched(e.target.value);
							}}
							value={quizLinkSearched}
						/>
					</div>
				</div>
				<div id="modalContent" className={styles.modalContent}>
					<div id="modalContentHeader" className={styles.modalContentHeader}>
						<span>Tampilkan</span>
						<div
							id="modalContentSelectContainer"
							className={styles.modalContentSelectContainer}
							onClick={() => setIsSelectShowPerPage(!isSelectShowPerPage)}
							ref={containerRef}>
							{quizLinkShowPerPage}
							<FontAwesomeIcon
								id="modalContentSelectIcon"
								icon={isSelectShowPerPage ? faChevronUp : faChevronDown}
								className={styles.modalContentSelectIcon}
							/>
							{isSelectShowPerPage && (
								<Select
									id="modalContentSelect"
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
					<div id="modalContentBody" className={styles.modalContentBody}>
						<table id="modalTable" className={styles.modalTable}>
							<thead id="modalTableHead" className={styles.modalTableHead}>
								<tr>
									<th>Pilih</th>
									<th>Nama Link</th>
									<th>Preview Link</th>
								</tr>
							</thead>
							<tbody id="modalTableBody" className={styles.modalTableBody}>
								{quizLinkList?.map((link) => {
									return (
										<tr key={link.ID} className={styles.modalTableBodyRow}>
											<td>
												<span
													id="modalTableSelect"
													className={styles.modalTableSelect}
													onClick={() => {
														onSubmit(link);
													}}>
													Pilih
												</span>
											</td>
											<td>{link.attachment_name}</td>
											<td>
												<a
													id="modalTablePreview"
													href={link.attachment_source}
													target="_blank"
													rel="noreferrer"
													className={styles.modalTablePreview}>
													{truncateString(link.attachment_source, 40)}
												</a>
											</td>
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
