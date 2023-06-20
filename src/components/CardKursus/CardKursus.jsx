import {
	faChevronDown,
	faMars,
	faPaperPlane,
	faPaperclip,
	faTrash,
	faVenus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { delCourse, putCourse } from '../../clients';
import { Button, ConfirmationModal, OutlineTag, Select } from '../../components';
import { useClickOutside } from '../../hooks';
import { deleteCourse, updateCourse } from '../../redux/actions/courseActions';
import styles from './CardKursus.module.css';

export default function CardKursus({ data, category }) {
	const [isShowPublishModal, setIsShowPublishModal] = useState(false);
	const [isShowClassSelect, setIsShowClassSelect] = useState(false);
	const [isShowMajorSelect, setIsShowMajorSelect] = useState(false);
	const [isShowThumbnailSelect, setIsShowThumbnailSelect] = useState(false);
	const [validation, setValidation] = useState(false);
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

	const [coursePrice, setCoursePrice] = useState(data.price);
	const [courseDescription, setCourseDescription] = useState(data.description);
	const [courseClass, setCourseClass] = useState(data.class_id);
	const [courseMajor, setCourseMajor] = useState(data.major_id);
	const [courseThumbnail, setCourseThumbnail] = useState(data.thumbnail);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const classRef = useClickOutside(() => {
		setIsShowClassSelect(false);
	});

	const majorRef = useClickOutside(() => {
		setIsShowMajorSelect(false);
	});

	const thumbnailRef = useClickOutside(() => {
		setIsShowThumbnailSelect(false);
	});

	useEffect(() => {
		setValidation(coursePrice && courseDescription && courseClass && courseMajor);
	}, [coursePrice, courseDescription, courseClass, courseMajor]);

	return (
		<>
			<div
				className={styles.container}
				onClick={() => {
					navigate(`/course/${data.ID}`);
				}}>
				<div className={styles.cardNavigation}>
					<OutlineTag type={data.status === 'publish' ? 'Green' : 'Yellow'}>
						{
							{
								publish: 'Publish',
								draft: 'Draft',
							}[data.status]
						}
					</OutlineTag>
				</div>
				<div className={styles.cardHeader}>
					<img
						className={styles.cardHeaderImage}
						src={`/thumbnail/${data.thumbnail}.png`}
						alt="thumbnail"
					/>
					<div className={styles.cardHeaderTitle}>
						<span className={styles.cardHeaderTitleText}>
							{data.course_name.length > 20
								? data.course_name.slice(0, 20) + '...'
								: data.course_name}
						</span>
						<div className={styles.cardHeaderGenderTag1}>
							<FontAwesomeIcon icon={faMars} className={styles.maleIcon} />
							<span className={styles.cardHeaderGenderTag1}>Laki Laki</span>
						</div>
						<div className={styles.genderLine}>
							<div className={styles.maleLine} style={{ width: '50%' }}></div>
							<div
								className={styles.femaleLine}
								style={{
									width: '50%',
								}}></div>
						</div>
						<div className={styles.cardHeaderGenderTag2}>
							<span className={styles.cardHeaderGenderTag2}>Perempuan</span>
							<FontAwesomeIcon icon={faVenus} className={styles.femaleIcon} />
						</div>
					</div>
				</div>
				<div className={styles.cardBody}>
					<div className={styles.cardBodyItem1}>
						<span className="text-[10px] text-gray-600">Jumlah Siswa</span>
						<span className="text-[24px] font-bold">100</span>
					</div>
					<div className={styles.cardBodyItem2}>
						<span className="text-[10px] text-gray-600">Jumlah Section</span>
						<span className="text-[24px] font-bold">10</span>
					</div>
				</div>
				<div className={styles.cardFooter}>
					<span className="text-[12px]">{data.live_session_week || '-'}</span>
				</div>
				<div className={styles.cardButton}>
					<Button
						type="Secondary"
						className={styles.deleteIconContainer}
						onClick={(e) => {
							e.stopPropagation();
							setIsShowDeleteModal(true);
						}}>
						<FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
						<span>Hapus</span>
					</Button>
					<Button
						type="Primary"
						className={styles.uploadIconContainer}
						onClick={(e) => {
							e.stopPropagation();
							data.status === 'draft'
								? setIsShowPublishModal(true)
								: putCourse({
										id: data.ID,
										data: {
											ID: data.ID,
											status: 'draft',
										},
								  }).then(() => {
										dispatch(
											updateCourse({
												ID: data.ID,
												status: 'draft',
											})
										);
								  });
						}}>
						<FontAwesomeIcon
							icon={data.status === 'draft' ? faPaperPlane : faPaperclip}
							className={styles.uploadIcon}
						/>
						<span>
							{
								{
									publish: 'Unpublish',
									draft: 'Publish',
								}[data.status]
							}
						</span>
					</Button>
				</div>
				<div className={styles.cardBorderColor}></div>
			</div>
			<Modal open={isShowPublishModal} onClose={() => setIsShowPublishModal(false)}>
				<div className={styles.publishModalContainer}>
					<div className={styles.publishModalHeader}>
						<span className={styles.publishModalHeaderTitle}>Publish Kursus</span>
					</div>
					<div className={styles.publishForm}>
						<div className={styles.priceForm}>
							<span className={styles.publishModalLabel}>Atur Harga Kursus</span>
							<input
								type="text"
								className={styles.priceInput}
								placeholder="Rp. 0"
								onChange={(e) => {
									const rawValue = e.target.value.replace(/\D/g, '');
									setCoursePrice(rawValue);
								}}
								value={
									coursePrice ? `Rp. ${coursePrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : ''
								}
							/>
						</div>
						<div className={styles.descriptionForm}>
							<span className={styles.publishModalLabel}>Deskripsi Kursus</span>
							<textarea
								className={styles.descriptionInput}
								placeholder="Jelaskan secara ringkas tentang kursusmu"
								onChange={(e) => {
									setCourseDescription(e.target.value);
								}}
								value={courseDescription}
							/>
						</div>
						<div className={styles.categoryAndThumbnailForm}>
							<div className={styles.categoryForm}>
								<span className={styles.publishModalLabel}>Kategorisasi</span>
								<div className={styles.categorySelectContainer}>
									<div
										className={styles.classSelectContainer}
										onClick={() => {
											setIsShowClassSelect(!isShowClassSelect);
										}}
										ref={classRef}>
										<span className={courseClass ? styles.classSelected : styles.classNotSelected}>
											{courseClass
												? category.class.find((item) => item.ID === courseClass).class_name
												: 'Pilih Kelas'}
										</span>
										<FontAwesomeIcon icon={faChevronDown} className={styles.arrowIcon} />
										<Select
											isShow={isShowClassSelect}
											className={styles.classSelect}
											options={{
												title: 'Kelas',
												data: category.class.map((item) => ({
													id: item.ID,
													option: item.class_name,
												})),
											}}
											handleSelected={(id) => {
												setCourseClass(id);
												setIsShowClassSelect(false);
											}}
										/>
									</div>
									<div
										className={styles.majorSelectContainer}
										onClick={() => {
											setIsShowMajorSelect(!isShowMajorSelect);
										}}
										ref={majorRef}>
										<span className={courseMajor ? styles.majorSelected : styles.majorNotSelected}>
											{courseMajor
												? category.major.find((item) => item.ID === courseMajor).major_name
												: 'Pilih Jurusan'}
										</span>
										<FontAwesomeIcon icon={faChevronDown} className={styles.arrowIcon} />
										<Select
											isShow={isShowMajorSelect}
											className={styles.majorSelect}
											options={{
												title: 'Jurusan',
												data: category.major.map((item) => ({
													id: item.ID,
													option: item.major_name,
												})),
											}}
											handleSelected={(id) => {
												setCourseMajor(id);
												setIsShowMajorSelect(false);
											}}
										/>
									</div>
								</div>
							</div>
							<div className={styles.thumbnailForm}>
								<span className={styles.publishModalLabel}>Thumbnail</span>
								<div
									className={styles.thumbnailSelectContainer}
									onClick={() => {
										setIsShowThumbnailSelect(!isShowThumbnailSelect);
									}}
									ref={thumbnailRef}>
									<img
										src={`/thumbnail/${courseThumbnail}.png`}
										alt=""
										className={styles.thumbnailSelectedImage}
									/>
									<FontAwesomeIcon icon={faChevronDown} className={styles.arrowIcon} />
									{isShowThumbnailSelect && (
										<div className={styles.thumbnailSelect}>
											{[
												'apple',
												'board',
												'book',
												'calculator',
												'camera',
												'earphone',
												'folder',
												'idea',
												'lamp',
												'medal',
												'monitor',
												'notebook',
												'pencil',
												'period',
												'phone',
												'ruller',
												'search',
												'toga',
												'trophy',
												'wifi',
											].map((item, index) => (
												<img
													key={index}
													src={`/thumbnail/${item}.png`}
													alt=""
													className={styles.thumbnailSelectOption}
													onClick={() => {
														setCourseThumbnail(item);
														setIsShowThumbnailSelect(false);
													}}
												/>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
						<div className={styles.modalButtonContainer}>
							<Button
								type="Secondary"
								className={styles.modalButton}
								onClick={() => {
									setIsShowPublishModal(false);
								}}>
								Batal
							</Button>
							<Button
								type={validation ? 'Primary' : 'Disabled'}
								className={styles.modalButton}
								onClick={() => {
									putCourse({
										id: data.ID,
										data: {
											ID: data.ID,
											price: coursePrice,
											description: courseDescription,
											class_id: courseClass,
											major_id: courseMajor,
											thumbnail: courseThumbnail,
											status: 'publish',
										},
									}).then(() => {
										dispatch(
											updateCourse({
												ID: data.ID,
												price: coursePrice,
												description: courseDescription,
												class_id: courseClass,
												major_id: courseMajor,
												thumbnail: courseThumbnail,
												status: 'publish',
											})
										);
									});
									setIsShowPublishModal(false);
								}}>
								Publish Kursus
							</Button>
						</div>
					</div>
				</div>
			</Modal>
			<ConfirmationModal
				show={isShowDeleteModal}
				title="Hapus Kursus"
				image="/image/customer-delete.png"
				confirmationText={`Apakah kamu yakin ingin menghapus ${data.course_name}?`}
				primaryButtonName="Hapus Kursus"
				onPrimaryButtonClick={() => {
					delCourse(data.ID).then(() => {
						dispatch(deleteCourse(data.ID));
					});
					setIsShowDeleteModal(false);
				}}
				secondaryButtonName="Batal"
				onSecondaryButtonClick={() => {
					setIsShowDeleteModal(false);
				}}
			/>
		</>
	);
}
