import {
	faCalendarAlt,
	faCircleInfo,
	faEdit,
	faTrash,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Timekeeper from 'react-timekeeper';
import { toast } from 'react-toastify';
import { delModule, postTask, putModule, putTask } from '../../../clients';
import { Button, ConfirmationModal } from '../../../components';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { deleteContent, updateContent } from '../../../redux/actions/sectionActions';
import { convertToDate, dateToTimestamp, displayDate } from '../../../utilities/date';
import styles from './Content.module.css';
import ContentCard from './ContentCard/ContentCard';
import LinkModal from './LinkModal/LinkModal';
import MediaModal from './MediaModal/MediaModal';

export default function Content({ selectedContent, onReset, folderList, quizList }) {
	const [contentName, setContentName] = useState('');
	const [contentType, setContentType] = useState('');
	const [contentDescription, setContentDescription] = useState('');

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isEditingContentName, setIsEditingContentName] = useState(false);
	const [isSelectDeadline, setIsSelectDeadline] = useState(false);
	const [isShowAddTextModal, setIsShowAddTextModal] = useState(false);
	const [isShowAddMediaModal, setIsShowAddMediaModal] = useState(false);
	const [isShowAddLinkModal, setIsShowAddLinkModal] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);

	const [selectedDeadlineDay, setSelectedDeadlineDay] = useState(Date.now());
	const [selectedDeadlineTime, setSelectedDeadlineTime] = useState('00:00');

	const content = useSelector((state) => state.section.content).find(
		(content) => content.ID === selectedContent.ID
	);

	const dispatch = useDispatch();

	const placeholderValue = {
		video: 'Masukkan nama video disini',
		tugas: 'Masukkan nama tugas disini',
		quiz: 'Masukkan nama quiz disini',
		materi: 'Masukkan nama materi disini',
		default: 'Masukkan nama video disini',
	}[contentType || 'default'];

	const selectDeadlineRef = useClickOutside(() => {
		setIsSelectDeadline(false);
	});

	const handleSelectDay = (day) => {
		setSelectedDeadlineDay(dateToTimestamp(day));
	};

	const handleSubmitDeadline = (deadline) => {
		if (content.tasks != null && content.tasks.length != 0) {
			putTask({
				data: {
					...content.tasks[0],
					due_date: deadline,
				},
				id: content.tasks[0].ID,
			})
				.then((res) => {
					toast.success(res.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
					dispatch(
						updateContent({
							...content,
							tasks: [
								{
									...res.data.data,
								},
							],
						})
					);
				})
				.catch((err) => {
					toast.error(err.response.data.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
				});
		} else {
			postTask({
				due_date: deadline,
				module_id: `${content.ID}`,
			})
				.then((res) => {
					toast.success(res.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
					dispatch(
						updateContent({
							...content,
							tasks: [
								{
									...res.data.data,
								},
							],
						})
					);
				})
				.catch((err) => {
					toast.error(err.response.data.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
				});
		}
	};

	useEffect(() => {
		setContentName(content.module_name.split('-').slice(1).join('-'));
		setContentType(content.module_name.split('-')[0]);
		setContentDescription(content.description);
	}, [content]);

	return (
		<div className={styles.container} key={content.ID}>
			<div className={styles.headerContainer}>
				<div className={styles.contentTitleContainer}>
					<div className={styles.titleFormContainer}>
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
					{contentType == 'tugas' && (
						<div className={styles.dueDateContainer}>
							<FontAwesomeIcon icon={faCalendarAlt} className={styles.deadlineIcon} />
							{content.tasks != null && content.tasks.length != 0 ? (
								<span className={styles.noDeadline}>{displayDate(content.tasks[0].due_date)}</span>
							) : (
								<span className={styles.noDeadline}>Belum ditentukan</span>
							)}
						</div>
					)}
					<div className={styles.contentDescription}>
						<FontAwesomeIcon icon={faCircleInfo} className={styles.toolTip} />
						<span className={styles.contentDescriptionText}>
							{content.description || 'Tidak ada deskripsi'}
						</span>
					</div>
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
						<FontAwesomeIcon icon={faCircleInfo} />
					</Button>
					{contentType == 'tugas' && (
						<div ref={selectDeadlineRef} className={styles.contentDeadlineWrapper}>
							<Button
								type="Secondary"
								className={styles.button}
								onClick={() => {
									setIsSelectDeadline(!isSelectDeadline);
								}}>
								<FontAwesomeIcon icon={faCalendarAlt} />
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
													handleSubmitDeadline(
														convertToDate(selectedDeadlineDay, selectedDeadlineTime)
													);
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
						type="Secondary"
						className={styles.button}
						onClick={() =>
							contentType === 'quiz' ? setIsShowAddLinkModal(true) : setIsShowAddMediaModal(true)
						}>
						<span>Tambahkan {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</span>
					</Button>
					<Button
						type="Primary"
						className={styles.button}
						onClick={() => {
							setShowSaveModal(true);
						}}>
						Simpan
					</Button>
				</div>
			</div>
			<ContentCard data={content} />
			<ConfirmationModal
				show={showDeleteModal}
				title="Hapus Konten"
				image="/image/section-delete.png"
				confirmationText={`Apakah anda yakin ingin menghapus ${contentType} ${contentName}?`}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					delModule(content.ID)
						.then((res) => {
							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(deleteContent(content.ID));
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						});
					onReset();
					setShowDeleteModal(false);
				}}
				onSecondaryButtonClick={() => setShowDeleteModal(false)}
			/>
			<ConfirmationModal
				show={showSaveModal}
				title="Simpan Konten"
				image="/image/course-save.png"
				confirmationText={`Apakah anda yakin ingin menyimpan ${contentType} ${contentName}?`}
				primaryButtonName="Simpan"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					putModule({
						data: {
							ID: content.ID,
							module_name: contentType + '-' + contentName,
						},
						id: content.ID,
					})
						.then((res) => {
							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(
								updateContent({
									...res.data.data,
								})
							);
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						});
					setShowSaveModal(false);
				}}
				onSecondaryButtonClick={() => setShowSaveModal(false)}
			/>
			<MediaModal
				show={isShowAddMediaModal}
				onClose={() => setIsShowAddMediaModal(false)}
				data={folderList}
				onSubmit={(file) => {
					putModule({
						data: {
							ID: content.ID,
							attachment_id: file.ID,
							attachment: file,
						},
						id: content.ID,
					})
						.then((res) => {
							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(
								updateContent({
									...res.data.data,
								})
							);
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						});
					setIsShowAddMediaModal(false);
				}}
			/>
			<LinkModal
				show={isShowAddLinkModal}
				onClose={() => setIsShowAddLinkModal(false)}
				data={quizList}
				onSubmit={(file) => {
					putModule({
						data: {
							ID: content.ID,
							attachment_id: file.ID,
							attachment: file,
						},
						id: content.ID,
					})
						.then((res) => {
							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(
								updateContent({
									...res.data.data,
								})
							);
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						});
					setIsShowAddLinkModal(false);
				}}
			/>
			<Modal open={isShowAddTextModal} onClose={() => setIsShowAddTextModal(false)}>
				<div className={styles.addTextModalContainer}>
					<div className={styles.addTextModalHeader}>
						<div className={styles.addTextModalTitle}>
							<span>{content.description != '' ? 'Edit Deskripsi' : 'Tambah Deskripsi'}</span>
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
							putModule({
								data: {
									ID: content.ID,
									description: contentDescription,
								},
								id: content.ID,
							})
								.then((res) => {
									toast.success(res.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									dispatch(
										updateContent({
											...res.data.data,
										})
									);
								})
								.catch((err) => {
									toast.error(err.response.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
								});
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
