import { faCalendarAlt, faEdit, faEye, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import Timekeeper from 'react-timekeeper';
import { Button } from '../../../components';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { convertToDate, dateToTimestamp } from '../../../utilities/date';
import styles from './Content.module.css';

import 'react-day-picker/dist/style.css';

export default function Content({ data }) {
	const [isEditingContentName, setIsEditingContentName] = useState(false);
	const [contentName, setContentName] = useState('Matematika Dasar');
	const [isSelectContent, setIsSelectContent] = useState(false);
	const [isSelectDeadline, setIsSelectDeadline] = useState(false);
	const [selectedDeadlineDay, setSelectedDeadlineDay] = useState(Date.now());
	const [selectedDeadlineTime, setSelectedDeadlineTime] = useState('00:00');
	const [isSeeingPreview, setIsSeeingPreview] = useState(false);
	const [deadline, setDeadline] = useState('');

	

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const placeholder = {
		video: 'Masukkan nama video materi disini',
		tugas: 'Masukkan nama tugas materi disini',
		quiz: 'Masukkan nama quiz materi disini',
		File: 'Masukkan nama materi disini',
		default: 'Masukkan nama video materi disini',
	};

	const placeholderValue = placeholder[data.type];

	const containerRef = useClickOutside(() => {
		setIsSelectDeadline(false);
	});

	const handleSelectDay = (day) => {
		setSelectedDeadlineDay(dateToTimestamp(day));
	};

	const renderOption = (option) => {
		const icon = {
			'PPT/docx/pdf': faFileAlt,
			Gambar: faQuestionCircle,
			Video: faVideo,
			Teks: faTasks,
		};

		return (
			<>
				<FontAwesomeIcon icon={icon[option]} className={styles.optionItemIcon} />
				<span>{option}</span>
			</>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.contentTitleContainer}>
				{isEditingContentName ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
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
				{data.type == 'Tugas' && (
					<div className={styles.contentDeadlineContainer} ref={containerRef}>
						<div
							className={styles.labelContainer}
							onClick={() => setIsSelectDeadline(!isSelectDeadline)}>
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
					</div>
				)}
				{data.type == 'Video' && (
					<>
						<div
							className={styles.previewContainer}
							onClick={() => setIsSeeingPreview(!isSeeingPreview)}>
							<FontAwesomeIcon icon={faEye} className={styles.previewIcon} />
							<span className={styles.previewText}>Lihat Video</span>
						</div>
						<Modal
							open={isSeeingPreview}
							onClose={() => setIsSeeingPreview(false)}
							style={{ padding: 0 }}>
							<div className={styles.videoPreviewContainer}>
								<div className={styles.previewTitle}>
									<span>Video Preview</span>
									<FontAwesomeIcon
										icon={faXmark}
										className={styles.previewCloseIcon}
										onClick={() => setIsSeeingPreview(false)}
									/>
								</div>
								<iframe
									width="560"
									height="315"
									src="https://youtube.com/embed/Z5NoQg8LdDk"
									allowFullScreen></iframe>
							</div>
						</Modal>
					</>
				)}
			</div>
			<div className={styles.contentButton}>
				<Button type="Danger" className={styles.button}>
					<FontAwesomeIcon icon={faTrash} />
				</Button>
				<div 
				className={styles.selectWrapper} 
				onClick={() => setIsSelectContent(!isSelectContent)}
				ref={containerRef}>
					<Button type="Primary" className={styles.button}>
						<span>Tambahkan Media</span>
					</Button>
					
				</div>
			</div>
		</div>
	);
}
