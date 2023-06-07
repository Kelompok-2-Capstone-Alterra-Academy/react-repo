import { faEdit, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Timekeeper from 'react-timekeeper';
import { Button, ConfirmationModal } from '../../../components';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { deleteContent, updateContent } from '../../../redux/actions/sectionActions';
import { convertToDate, dateToTimestamp } from '../../../utilities/date';
import styles from './Content.module.css';
import ContentCard from './ContentCard/ContentCard';
import LinkModal from './LinkModal/LinkModal';
import MediaModal from './MediaModal/MediaModal';
import { COURSE_FOLDER, QUIZ_LINK } from './constans';

export default function Content({ data, sectionId, onResetContent }) {
	const [contentName, setContentName] = useState('');
	const [deadline, setDeadline] = useState('');
	const [contentDescription, setContentDescription] = useState('');

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isEditingContentName, setIsEditingContentName] = useState(false);
	const [isSelectDeadline, setIsSelectDeadline] = useState(false);
	const [isShowAddTextModal, setIsShowAddTextModal] = useState(false);
	const [isShowAddMediaModal, setIsShowAddMediaModal] = useState(false);
	const [isShowAddLinkModal, setIsShowAddLinkModal] = useState(false);

	const [selectedDeadlineDay, setSelectedDeadlineDay] = useState(Date.now());
	const [selectedDeadlineTime, setSelectedDeadlineTime] = useState('00:00');

	const stateData = useSelector((state) => state.section);
	const selectedSection = stateData.section.find((section) => section.id === sectionId);
	const selectedContent = selectedSection.content.find((content) => content.id === data.id);

	const dispatch = useDispatch();

	const placeholder = {
		video: 'Masukkan nama video disini',
		tugas: 'Masukkan nama tugas disini',
		quiz: 'Masukkan nama quiz disini',
		materi: 'Masukkan nama materi disini',
		default: 'Masukkan nama video disini',
	};
	const placeholderValue = placeholder[selectedContent.type];

	const selectDeadlineRef = useClickOutside(() => {
		setIsSelectDeadline(false);
	});

	const handleSelectDay = (day) => {
		setSelectedDeadlineDay(dateToTimestamp(day));
	};

	useEffect(() => {
		dispatch(
			updateContent({
				sectionId: sectionId,
				content: {
					id: selectedContent.id,
					title: contentName,
				},
			})
		);
	}, [contentName]);

	useEffect(() => {
		if (selectedContent.type === 'tugas') {
			dispatch(
				updateContent({
					sectionId: sectionId,
					content: {
						id: selectedContent.id,
						deadline: deadline,
					},
				})
			);
		}
	}, [deadline]);

	useEffect(() => {
		setContentName(selectedContent.title);
		setDeadline(selectedContent.deadline);
		setContentDescription(selectedContent.desc);
	}, [selectedContent]);

	return (
		<div className={styles.container} key={selectedContent.id}>
			<div className={styles.headerContainer}>
				<div className={styles.contentTitleContainer}>
					{isEditingContentName ? (
						<form
							onSubmit={() => {
								setIsEditingContentName(false);
							}}>
							<input
								type="text"
								className={styles.contentTitleInput}
								value={contentName}
								onChange={(e) => setContentName(e.target.value)}
								autoFocus
								maxLength={50}
								placeholder={placeholderValue}
								onBlur={() => setIsEditingContentName(false)}
							/>
						</form>
					) : (
						<div>
							<span
								className={
									contentName === '' ? styles.contentTitlePlaceholder : styles.contentTitle
								}>
								{contentName === '' ? placeholderValue : contentName}
							</span>
							<FontAwesomeIcon
								icon={faEdit}
								className={styles.contentTitleEditIcon}
								onClick={() => setIsEditingContentName(true)}
							/>
						</div>
					)}
				</div>
				<div className={styles.contentButton}>
					<Button
						type="Danger"
						className={styles.button}
						onClick={() => {
							setShowDeleteModal(true);
						}}>
						<FontAwesomeIcon icon={faTrash} />
					</Button>
					<Button
						type="Secondary"
						className={styles.button}
						onClick={() => {
							setIsShowAddTextModal(true);
						}}>
						<span>
							<span>{selectedContent.desc != '' ? 'Edit Deskripsi' : 'Tambahkan Deskripsi'}</span>
						</span>
					</Button>
					{selectedContent.type === 'tugas' && (
						<div ref={selectDeadlineRef} className={styles.contentDeadlineWrapper}>
							<Button
								type="Secondary"
								className={styles.button}
								onClick={() => {
									setIsSelectDeadline(!isSelectDeadline);
								}}>
								<span>{deadline ? 'Edit Deadline' : 'Tambahkan Deadline'}</span>
							</Button>
							{isSelectDeadline && (
								<div className={styles.datePickerWrapper}>
									<div className={styles.datePickerContainer}>
										<div className={styles.formGroup}>
											<div className={styles.datePicker}>
												<DayPicker
													mode="single"
													className={styles.dayPicker}
													selected={selectedDeadlineDay}
													onSelect={handleSelectDay}
												/>
											</div>
											<div className={styles.timePicker}>
												<Timekeeper
													onChange={(e) => {
														setSelectedDeadlineTime(e.formatted24);
													}}
													time={selectedDeadlineTime}
													hour24Mode={true}
													switchToMinuteOnHourSelect={true}
												/>
											</div>
										</div>
										<div className={styles.dateButtonContainer}>
											<Button
												type="Danger"
												className={styles.dateButton}
												onClick={() => setIsSelectDeadline(!isSelectDeadline)}>
												<span>Batal</span>
											</Button>
											<Button
												type="Primary"
												className={styles.dateButton}
												onClick={() => {
													setDeadline(convertToDate(selectedDeadlineDay, selectedDeadlineTime));
													setIsSelectDeadline(!isSelectDeadline);
												}}>
												<span>Jadwalkan</span>
											</Button>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
					<Button
						type="Primary"
						className={styles.button}
						onClick={() =>
							selectedContent.type === 'quiz'
								? setIsShowAddLinkModal(true)
								: setIsShowAddMediaModal(true)
						}>
						<span>
							{selectedContent.name ? 'Ubah ' : 'Tambahkan'} {selectedContent.type}
						</span>
					</Button>
				</div>
			</div>
			<div className={styles.contentAndDescriptionContainer}>
				<ContentCard data={selectedContent} />
				{selectedContent.desc && (
					<div className={styles.contentDescription}>
						<span className={styles.contentDescriptionText}>{selectedContent.desc}</span>
					</div>
				)}
			</div>
			<ConfirmationModal
				show={showDeleteModal}
				title="Hapus Konten"
				image="/image/section-delete.png"
				confirmationText={`Apakah anda yakin ingin menghapus ${selectedContent.type} ${selectedContent.title}?`}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					dispatch(
						deleteContent({
							sectionId: sectionId,
							contentId: selectedContent.id,
						})
					);
					onResetContent();
					setShowDeleteModal(false);
				}}
				onSecondaryButtonClick={() => setShowDeleteModal(false)}
			/>
			<MediaModal
				show={isShowAddMediaModal}
				type={selectedContent.type}
				onClose={() => setIsShowAddMediaModal(false)}
				data={COURSE_FOLDER}
				onSubmit={(media) => {
					dispatch(
						updateContent({
							sectionId: sectionId,
							content: {
								...media,
								id: selectedContent.id,
							},
						})
					);
					setIsShowAddMediaModal(false);
				}}
			/>
			<LinkModal
				show={isShowAddLinkModal}
				onClose={() => setIsShowAddLinkModal(false)}
				data={QUIZ_LINK}
				onSubmit={(link) => {
					dispatch(
						updateContent({
							sectionId: sectionId,
							content: {
								...link,
								id: selectedContent.id,
							},
						})
					);
					setIsShowAddLinkModal(false);
				}}
			/>
			<Modal open={isShowAddTextModal} onClose={() => setIsShowAddTextModal(false)}>
				<div className={styles.addTextModalContainer}>
					<div className={styles.addTextModalHeader}>
						<div className={styles.addTextModalTitle}>
							<span>{selectedContent.desc != '' ? 'Edit Deskripsi' : 'Tambah Deskripsi'}</span>
							<FontAwesomeIcon
								icon={faXmark}
								className={styles.addTextModalCloseIcon}
								onClick={() => setIsShowAddTextModal(false)}
							/>
						</div>
					</div>
					<textarea
						type="text"
						placeholder="Tambah deskripsi"
						className={styles.addTextModalInput}
						value={contentDescription}
						onChange={(e) => setContentDescription(e.target.value)}
					/>
					<Button
						type="Primary"
						onClick={() => {
							dispatch(
								updateContent({
									sectionId: sectionId,
									content: {
										id: selectedContent.id,
										desc: contentDescription,
									},
								})
							);
							setIsShowAddTextModal(false);
						}}
						className={styles.addTextModalButton}>
						Simpan
					</Button>
				</div>
			</Modal>
		</div>
	);
}
