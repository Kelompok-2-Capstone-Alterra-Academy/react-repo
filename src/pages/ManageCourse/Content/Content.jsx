import {
	faCalendarAlt,
	faChevronDown,
	faChevronUp,
	faCircleInfo,
	faEdit,
	faFileAlt,
	faInfoCircle,
	faSearch,
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
import { delModule, postTask, putModule, putSubmission, putTask } from '../../../clients';
import { Button, ConfirmationModal, Select, Tag } from '../../../components';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { deleteContent, updateContent } from '../../../redux/actions/sectionActions';
import { convertToDate, dateToTimestamp, displayDate, isAfter } from '../../../utilities/date';
import styles from './Content.module.css';
import ContentCard from './ContentCard/ContentCard';
import LinkModal from './LinkModal/LinkModal';
import MediaModal from './MediaModal/MediaModal';

export default function Content({ selectedContent, onReset, folderList, quizList }) {
	const [contentName, setContentName] = useState('');
	const [contentType, setContentType] = useState('');
	const [contentDescription, setContentDescription] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [score, setScore] = useState('');

	const [limitPage, setLimitPage] = useState(4);
	const [offsetPage, setOffsetPage] = useState(0);

	const [selectedSubmission, setSelectedSubmission] = useState(null);

	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
	const [isEditingContentName, setIsEditingContentName] = useState(false);
	const [isSelectDeadline, setIsSelectDeadline] = useState(false);
	const [isShowAddTextModal, setIsShowAddTextModal] = useState(false);
	const [isShowAddMediaModal, setIsShowAddMediaModal] = useState(false);
	const [isShowAddLinkModal, setIsShowAddLinkModal] = useState(false);
	const [isShowSaveModal, setIsShowSaveModal] = useState(false);
	const [isShowScoreModal, setIsShowScoreModal] = useState(false);
	const [isSelectShowPerPage, setIsSelectShowPerPage] = useState(false);

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

	const selectShowPerPageRef = useClickOutside(() => {
		setIsSelectShowPerPage(false);
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
					toast.success(res.data.message, {
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
					toast.success(res.data.message, {
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

	useEffect(() => {
		setScore(selectedSubmission?.score || '');
	}, [selectedSubmission]);

	return (
		<>
			<div id="container" className={styles.container}>
				<div id="headerContainer" className={styles.headerContainer}>
					<div id="contentTitleContainer" className={styles.contentTitleContainer}>
						<div id="titleFormContainer" className={styles.titleFormContainer}>
							{isEditingContentName ? (
								<form
									id="contentNameForm"
									onSubmit={() => {
										setIsEditingContentName(false);
									}}>
									<input
										type="text"
										id="contentTitleInput"
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
										id="contentTitle"
										className={
											contentName === '' ? styles.contentTitlePlaceholder : styles.contentTitle
										}>
										{contentName === '' ? placeholderValue : contentName}
									</span>
									<FontAwesomeIcon
										id="contentTitleEditIcon"
										icon={faEdit}
										className={styles.contentTitleEditIcon}
										onClick={() => setIsEditingContentName(true)}
									/>
								</div>
							)}
						</div>
						{contentType == 'tugas' && (
							<div id="dueDateContainer" className={styles.dueDateContainer}>
								<FontAwesomeIcon
									id="deadlineIcon"
									icon={faCalendarAlt}
									className={styles.deadlineIcon}
								/>
								{content.tasks != null && content.tasks.length != 0 ? (
									<span id="dueDate" className={styles.noDeadline}>
										{displayDate(content.tasks[0].due_date)}
									</span>
								) : (
									<span id="noDueDate" className={styles.noDeadline}>
										Belum ditentukan
									</span>
								)}
							</div>
						)}
						<div id="contentDescription" className={styles.contentDescription}>
							<FontAwesomeIcon id="toolTipIcon" icon={faCircleInfo} className={styles.toolTip} />
							<span id="contentDescriptionText" className={styles.contentDescriptionText}>
								{content.description || 'Tidak ada deskripsi'}
							</span>
						</div>
					</div>
					<div id="contentButton" className={styles.contentButton}>
						<Button
							id="deleteButton"
							type="Danger"
							className={styles.button}
							onClick={() => {
								setIsShowDeleteModal(true);
							}}>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
						<Button
							id="addTextButton"
							type="Secondary"
							className={styles.button}
							onClick={() => {
								setIsShowAddTextModal(true);
							}}>
							<FontAwesomeIcon icon={faCircleInfo} />
						</Button>
						{contentType == 'tugas' && (
							<div
								id="contentDeadlineWrapper"
								ref={selectDeadlineRef}
								className={styles.contentDeadlineWrapper}>
								<Button
									id="selectDeadlineButton"
									type="Secondary"
									className={styles.button}
									onClick={() => {
										setIsSelectDeadline(!isSelectDeadline);
									}}>
									<FontAwesomeIcon icon={faCalendarAlt} />
								</Button>
								{isSelectDeadline && (
									<div id="datePickerWrapper" className={styles.datePickerWrapper}>
										<div id="datePickerContainer" className={styles.datePickerContainer}>
											<div id="deadlineFormGroup" className={styles.deadlineFormGroup}>
												<div id="datePicker" className={styles.datePicker}>
													<DayPicker
														mode="single"
														className={styles.dayPicker}
														selected={selectedDeadlineDay}
														onSelect={handleSelectDay}
													/>
												</div>
												<div id="timePicker" className={styles.timePicker}>
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
											<div id="dateButtonContainer" className={styles.dateButtonContainer}>
												<Button
													id="cancelDeadlineButton"
													type="Danger"
													className={styles.dateButton}
													onClick={() => setIsSelectDeadline(!isSelectDeadline)}>
													<span>Batal</span>
												</Button>
												<Button
													id="scheduleDeadlineButton"
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
							id="addContentButton"
							type="Secondary"
							className={styles.button}
							onClick={() =>
								contentType === 'quiz' ? setIsShowAddLinkModal(true) : setIsShowAddMediaModal(true)
							}>
							<span>Tambahkan {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</span>
						</Button>
						<Button
							id="saveButton"
							type="Primary"
							className={styles.button}
							onClick={() => {
								setIsShowSaveModal(true);
							}}>
							Rename
						</Button>
					</div>
				</div>
				<ContentCard data={content} />
				{contentType == 'tugas' && content.submission != null && content.submission.length != 0 && (
					<div id="tableContainer" className={styles.tableContainer}>
						<div id="tableHeader" className={styles.tableHeader}>
							<div id="tableTitleContainer" className={styles.tableTitleContainer}>
								<span id="tableTitle" className={styles.tableTitle}>
									Tugas Terkumpul
								</span>
								<div id="showPerPageWrapper" className={styles.showPerPageWrapper}>
									<span>Tampilkan</span>
									<div
										id="selectShowPerPageContainer"
										className={styles.modalContentSelectContainer}
										onClick={() => setIsSelectShowPerPage(!isSelectShowPerPage)}
										ref={selectShowPerPageRef}>
										{limitPage}
										<FontAwesomeIcon
											icon={isSelectShowPerPage ? faChevronUp : faChevronDown}
											className={styles.modalContentSelectIcon}
										/>
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
													setLimitPage(id === 1 ? 4 : id === 2 ? 8 : 12);
													setIsSelectShowPerPage(false);
												}}
											/>
										)}
									</div>
									<span>Per Page</span>
								</div>
							</div>
							<div id="searchWrapper" className={styles.searchWrapper}>
								<FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
								<input
									id="searchInput"
									type="text"
									className={styles.searchInput}
									placeholder="Cari Nama Siswa"
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
								/>
							</div>
						</div>
						<div id="tableBody" className={styles.tableBody}>
							<table id="table" className={styles.table}>
								<thead>
									<tr id="tableHead" className={styles.tableHead}>
										<th id="tableHeaderCellNo" className={styles.tableHeaderCellNo}>
											No
										</th>
										<th id="tableHeaderCellName" className={styles.tableHeaderCellName}>
											Nama Siswa
										</th>
										<th id="tableHeaderCellDate" className={styles.tableHeaderCellDate}>
											Waktu Pengumpulan
										</th>
										<th id="tableHeaderCellFile" className={styles.tableHeaderCellFile}>
											File Jawaban
										</th>
										<th id="tableHeaderCellScore" className={styles.tableHeaderCellScore}>
											Nilai
										</th>
										<th id="tableHeaderCellStatus" className={styles.tableHeaderCellStatus}>
											Status
										</th>
										<th id="tableHeaderCellAction" className={styles.tableHeaderCellAction}>
											Tindakan
										</th>
									</tr>
								</thead>
								<tbody id="tableBody" className={styles.tableBody}>
									{content.submission
										.filter((submission) =>
											submission.student.name.toLowerCase().includes(searchValue.toLowerCase())
										)
										.slice(offsetPage, offsetPage + limitPage)
										.map((submission, index) => {
											return (
												<tr key={submission.ID}>
													<td id="tableBodyCellNo" className={styles.tableBodyCellNo}>
														{index + 1}
													</td>
													<td id="tableBodyCellName" className={styles.tableBodyCellName}>
														{submission.student.name || 'Tidak Dikenal'}
													</td>
													<td id="tableBodyCellDate" className={styles.tableBodyCellDate}>
														{displayDate(submission.CreatedAt)}
													</td>
													<td id="tableBodyCellFile" className={styles.tableBodyCellFile}>
														{submission.submission_source != null ? (
															<a
																href={submission.submission_source}
																className={styles.fileLink}
																target="_blank"
																rel="noreferrer">
																<span>
																	<FontAwesomeIcon icon={faFileAlt} className={styles.fileIcon} />
																	File Jawaban
																</span>
															</a>
														) : (
															<span>Tidak ada file</span>
														)}
													</td>
													<td id="tableBodyCellScore" className={styles.tableBodyCellScore}>
														{submission.score || '-'}
														/100
													</td>
													<td id="tableBodyCellStatus" className={styles.tableBodyCellStatus}>
														{isAfter(submission.CreatedAt, content.tasks[0]?.due_date) ? (
															<Tag id="tableTagLate" type="Red" className={styles.tag}>
																Terlambat
															</Tag>
														) : submission.score != '' ? (
															<Tag id="tableTagEvaluated" type="Green" className={styles.tag}>
																Sudah Dinilai
															</Tag>
														) : (
															<Tag id="tableTagNotEvaluated" type="Yellow" className={styles.tag}>
																Belum Dinilai
															</Tag>
														)}
													</td>
													<td id="tableBodyCellAction" className={styles.tableBodyCellAction}>
														<div id="actionButtonWrapper" className={styles.actionButtonWrapper}>
															<span
																className={styles.tableButton}
																onClick={() => {
																	setSelectedSubmission(submission);
																	setIsShowScoreModal(true);
																}}
																id="tableButton">
																<FontAwesomeIcon icon={faEdit} className={styles.tableActionIcon} />
																Nilai
															</span>
														</div>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
							<div className={styles.tablePagination}>
								{content.submission.length > limitPage && (
									<div className={styles.paginationWrapper}>
										<div className={styles.paginationButtonContainer}>
											<Button
												type={offsetPage === 0 ? 'Disabled' : 'Secondary'}
												className={styles.paginationButton}
												onClick={() => {
													setOffsetPage(offsetPage - limitPage);
												}}>
												<span>Sebelumnya</span>
											</Button>
											<span className={styles.paginationInfo}>
												{offsetPage + 1}-
												{offsetPage + limitPage > content.submission.length
													? content.submission.length
													: offsetPage + limitPage}{' '}
												dari {content.submission.length}
											</span>
											<Button
												type={
													offsetPage + limitPage >= content.submission.length
														? 'Disabled'
														: 'Secondary'
												}
												className={styles.paginationButton}
												onClick={() => {
													setOffsetPage(offsetPage + limitPage);
												}}>
												<span>Selanjutnya</span>
											</Button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
			<ConfirmationModal
				show={isShowDeleteModal}
				title="Hapus Konten"
				image="/image/section-delete.png"
				confirmationText={`Apakah anda yakin ingin menghapus ${contentType} ${contentName}?`}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					delModule(content.ID)
						.then((res) => {
							toast.success(res.data.message, {
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
					setIsShowDeleteModal(false);
				}}
				onSecondaryButtonClick={() => setIsShowDeleteModal(false)}
			/>
			<ConfirmationModal
				show={isShowSaveModal}
				title="Rename Konten"
				image="/image/course-save.png"
				confirmationText={`Apakah anda yakin ingin menyimpan ${contentType} ${contentName}?`}
				primaryButtonName="Rename"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					putModule({
						data: {
							...content,
							module_name: contentType + '-' + contentName,
						},
						id: content.ID,
					})
						.then((res) => {
							toast.success(res.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(
								updateContent({
									module_name: contentType + '-' + contentName,
									ID: content.ID,
								})
							);
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						});
					setIsShowSaveModal(false);
				}}
				onSecondaryButtonClick={() => setIsShowSaveModal(false)}
			/>
			<MediaModal
				show={isShowAddMediaModal}
				onClose={() => setIsShowAddMediaModal(false)}
				data={folderList}
				onSubmit={(file) => {
					putModule({
						data: {
							...content,
							attachment_id: `${file.ID}`,
						},
						id: content.ID,
					})
						.then((res) => {
							toast.success(res.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(
								updateContent({
									attachment_id: `${file.ID}`,
									attachment: file,
									ID: content.ID,
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
				type={contentType}
			/>
			<LinkModal
				show={isShowAddLinkModal}
				onClose={() => setIsShowAddLinkModal(false)}
				data={quizList}
				onSubmit={(file) => {
					putModule({
						data: {
							...content,
							attachment_id: `${file.ID}`,
						},
						id: content.ID,
					})
						.then((res) => {
							toast.success(res.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(
								updateContent({
									attachment_id: `${file.ID}`,
									attachment: file,
									ID: content.ID,
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
									...content,
									description: contentDescription,
								},
								id: content.ID,
							})
								.then((res) => {
									toast.success(res.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									dispatch(
										updateContent({
											description: contentDescription,
											ID: content.ID,
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
			<Modal
				open={isShowScoreModal}
				onClose={() => {
					setScore(0);
					setSelectedSubmission(null);
					setIsShowScoreModal(false);
				}}>
				<div className={styles.addScoreModalContainer}>
					<span className={styles.headerTitle}>Form Nilai Siswa</span>
					<div className={styles.formGroup}>
						<span className={styles.label}>Nilai Siswa</span>
						<input
							type="number"
							className={styles.input}
							placeholder="Masukkan Nilai Siswa"
							value={score}
							onChange={(e) =>
								setScore(e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value)
							}
						/>
						<span className={styles.helpText}>
							<FontAwesomeIcon icon={faInfoCircle} className={styles.helpTextIcon} />
							Masukkan nilai siswa dalam rentang 0-100
						</span>
					</div>
					<Button
						type="Primary"
						onClick={() => {
							putSubmission({
								data: {
									score: `${score}`,
								},
								id: selectedSubmission.ID,
							})
								.then((res) => {
									toast.success(res.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									dispatch(
										updateContent({
											submission: content.submission.map((submission) => {
												if (submission.ID === selectedSubmission.ID) {
													return {
														...submission,
														score: score,
													};
												} else {
													return submission;
												}
											}),
											ID: content.ID,
										})
									);
								})
								.catch((err) => {
									toast.error(err.response.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
								});
							setIsShowScoreModal(false);
						}}
						className={styles.addTextModalButton}>
						Simpan Penilaian
					</Button>
				</div>
			</Modal>
		</>
	);
}
