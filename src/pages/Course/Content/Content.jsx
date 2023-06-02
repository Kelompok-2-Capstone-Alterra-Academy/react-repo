import {
	faCalendarAlt,
	faEdit,
	faInfoCircle,
	faLink,
	faTrash,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useDispatch } from 'react-redux';
import Timekeeper from 'react-timekeeper';
import { Button, ConfirmationModal } from '../../../components';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { deleteContent, updateContent } from '../../../redux/actions/sectionActions';
import { convertToDate, dateToTimestamp } from '../../../utilities/date';
import styles from './Content.module.css';

import 'react-day-picker/dist/style.css';

export default function Content({ data, sectionId, onResetContent }) {
	const [contentName, setContentName] = useState(data.title);
	const [deadline, setDeadline] = useState(data.deadline);
	const [tugasDescription, setTugasDescription] = useState(data.description);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isEditingContentName, setIsEditingContentName] = useState(false);
	const [isSelectContent, setIsSelectContent] = useState(false);
	const [isSelectDeadline, setIsSelectDeadline] = useState(false);
	const [selectedDeadlineDay, setSelectedDeadlineDay] = useState(Date.now());
	const [selectedDeadlineTime, setSelectedDeadlineTime] = useState('00:00');
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const dispatch = useDispatch();

	const placeholder = {
		Video: 'Masukkan nama video disini',
		Tugas: 'Masukkan nama tugas disini',
		Quiz: 'Masukkan nama quiz disini',
		Materi: 'Masukkan nama materi disini',
		default: 'Masukkan nama video disini',
	};
	const placeholderValue = placeholder[data.type];

	const containerRef = useClickOutside(() => {
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
					id: data.id,
					title: contentName,
				},
			})
		);
	}, [contentName]);

	useEffect(() => {
		dispatch(
			updateContent({
				sectionId: sectionId,
				content: {
					id: data.id,
					deadline: deadline,
					description: tugasDescription,
				},
			})
		);
	}, [deadline, tugasDescription]);

	const ContentNameInput = () => {
		return (
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
							className={contentName === '' ? styles.contentTitlePlaceholder : styles.contentTitle}>
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
		);
	};

	const ContentVideo = () => {
		return (
			<div className={styles.contentVideoContainer}>
				<div className={styles.contentVideoBackground}>
					<iframe width="670" height="376" src={data.video} allowFullScreen></iframe>
				</div>
			</div>
		);
	};

	const ContentTugas = () => {
		return (
			<div className={styles.contentDeadlineContainer}>
				<div
					onClick={() => setIsSelectDeadline(!isSelectDeadline)}
					ref={containerRef}
					className={styles.contentDeadlineWrapper}>
					<span className={deadline === '' ? styles.deadlinePlacholder : styles.deadline}>
						{deadline === '' ? 'Masukkan deadline pengumpulan tugas' : deadline}
					</span>
					<FontAwesomeIcon icon={faCalendarAlt} className={styles.contentDeadlineIcon} />
				</div>
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
				<div
					className={styles.documentCard}
					onClick={() => {
						setIsPreviewOpen(true);
					}}>
					<img className={styles.previewDocument} src={data.filePreview} alt="Preview" />
					<span className={styles.documentTitle}>{data.fileName}</span>
					<span className={styles.documentSize}>{data.fileSize}</span>
					<span className={styles.documentDescription}>
						<FontAwesomeIcon icon={faInfoCircle} className={styles.toolTipIcon} />
						<span className={styles.tooltip}>{data.fileDesc}</span>
					</span>
				</div>
				<Modal
					open={isPreviewOpen}
					onClose={() => {
						setIsPreviewOpen(false);
					}}
					className={styles.modalContainer}>
					<div className={styles.modalContent}>
						<iframe className={styles.modalDocument} src={data.file} title="PDF Viewer"></iframe>
						<div
							className={styles.closePreviewContainer}
							onClick={() => {
								setIsPreviewOpen(false);
							}}>
							<FontAwesomeIcon icon={faXmark} className={styles.closePreviewIcon} />
						</div>
					</div>
				</Modal>
			</div>
		);
	};

	const ContentMateri = () => {
		return (
			<div className={styles.contentDocumentContainer}>
				<div
					className={styles.documentCard}
					onClick={() => {
						setIsPreviewOpen(true);
					}}>
					<img className={styles.previewDocument} src={data.filePreview} alt="Preview" />
					<span className={styles.documentTitle}>{data.fileName}</span>
					<span className={styles.documentSize}>{data.fileSize}</span>
				</div>
				<Modal
					open={isPreviewOpen}
					onClose={() => {
						setIsPreviewOpen(false);
					}}
					className={styles.modalContainer}>
					<div className={styles.modalContent}>
						<iframe className={styles.modalDocument} src={data.file} title="PDF Viewer"></iframe>
						<div
							className={styles.closePreviewContainer}
							onClick={() => {
								setIsPreviewOpen(false);
							}}>
							<FontAwesomeIcon icon={faXmark} className={styles.closePreviewIcon} />
						</div>
					</div>
				</Modal>
			</div>
		);
	};

	const ContentQuiz = () => {
		return (
			<a
				className={styles.contentQuizContainer}
				href={data.quizLink}
				target="_blank"
				rel="noreferrer">
				<FontAwesomeIcon icon={faLink} className={styles.quizIcon} />
				<span className={styles.quizName}>{data.quizName}</span>
			</a>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<ContentNameInput />
				<div className={styles.contentButton}>
					<Button
						type="Danger"
						className={styles.button}
						onClick={() => {
							setShowDeleteModal(true);
						}}>
						<FontAwesomeIcon icon={faTrash} />
					</Button>
					<div
						className={styles.selectWrapper}
						onClick={() => setIsSelectContent(!isSelectContent)}>
						<Button type="Primary" className={styles.button}>
							<span>Tambahkan Media</span>
						</Button>
					</div>
				</div>
			</div>
			{data.type === 'Video' ? (
				<ContentVideo />
			) : data.type === 'Tugas' ? (
				<ContentTugas />
			) : data.type === 'Quiz' ? (
				<ContentQuiz />
			) : data.type === 'Materi' ? (
				<ContentMateri />
			) : (
				<ContentVideo />
			)}
			<ConfirmationModal
				show={showDeleteModal}
				title="Hapus Konten"
				image="/image/section-delete.png"
				confirmationText={`Apakah anda yakin ingin menghapus ${data.type} ${data.title}?`}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					dispatch(
						deleteContent({
							sectionId: sectionId,
							contentId: data.id,
						})
					);
					onResetContent();
					setShowDeleteModal(false);
				}}
				onSecondaryButtonClick={() => setShowDeleteModal(false)}
			/>
		</div>
	);
}
