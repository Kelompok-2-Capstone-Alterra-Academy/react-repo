import styles from './Content.module.css';
import { Button } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import Timekeeper from 'react-timekeeper';

import 'react-day-picker/dist/style.css';

export default function Content({ type }) {
	const [isEditingContentName, setIsEditingContentName] = useState(false);
	const [contentName, setContentName] = useState('Matematika Dasar');
	const [isSelectContent, setIsSelectContent] = useState(false);
	const [selectedDeadlineDay, setSelectedDeadlineDay] = useState(Date.now());
	const [selectedDeadlineTime, setSelectedDeadlineTime] = useState('10:00');

	const placeholder = {
		video: 'Masukkan nama video materi disini',
		tugas: 'Masukkan nama tugas materi disini',
		quiz: 'Masukkan nama quiz materi disini',
		materi: 'Masukkan nama materi disini',
		default: 'Masukkan nama video materi disini',
	};

	const placeholderValue = placeholder[type] || placeholder.default;

	return (
		<div className={styles.container}>
			<div className={styles.contentTitleContainer}>
				{isEditingContentName ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setIsEditingContentName(false);
						}}
					>
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
							className={contentName === '' ? styles.contentTitlePlaceholder : styles.contentTitle}
						>
							{contentName === '' ? placeholderValue : contentName}
						</span>
						<FontAwesomeIcon
							icon={faEdit}
							className={styles.contentTitleEditIcon}
							onClick={() => setIsEditingContentName(true)}
						/>
					</div>
				)}
				{type == 'tugas' && (
					<div className={styles.contentDeadlineContainer}>
						<span className={styles.contentDeadlineTitle}>Masukkan deadline pengumpulan tugas</span>
						<div className={styles.datePickerContainer}>
							<div className={styles.formGroup}>
								<div className={styles.datePicker}>
									<DayPicker
										mode="single"
										className={styles.dayPicker}
										selected={selectedDeadlineDay}
										onSelect={setSelectedDeadlineDay}
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
									onClick={() => setIsSelectContent(!isSelectContent)}
								>
									<span>Batal</span>
								</Button>
								<Button
									type="Primary"
									className={styles.dateButton}
									onClick={() => setIsSelectContent(!isSelectContent)}
								>
									<span>Jadwalkan</span>
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className={styles.contentButton}>
				<Button type="Danger" className={styles.button}>
					<FontAwesomeIcon icon={faTrash} />
				</Button>
				<div className={styles.selectWrapper} onClick={() => setIsSelectContent(!isSelectContent)}>
					<Button type="Primary" className={styles.button}>
						<span>Tambahkan Media</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
