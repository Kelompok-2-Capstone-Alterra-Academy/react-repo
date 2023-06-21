import {
	faArrowAltCircleLeft,
	faArrowAltCircleRight,
	faChevronDown,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getClass, getCourse, getMajor, postCourse } from '../../clients';
import { Button, CardKursus, Header } from '../../components';
import { useClickOutside } from '../../hooks';
import { addCourse, setCourse } from '../../redux/actions/courseActions';
import styles from './Dashboard.module.css';

export default function Dashboard() {
	const [isShowCreateCourseModal, setIsShowCreateCourseModal] = useState(false);
	const [isShowThumbnailSelect, setIsShowThumbnailSelect] = useState(false);
	const [validation, setValidation] = useState(false);
	const [loadingCreateCourse, setLoadingCreateCourse] = useState(false);

	const [loadingFetch, setLoadingFetch] = useState(true);
	const [loadingFetchMajor, setLoadingFetchMajor] = useState(true);
	const [loadingFetchClass, setLoadingFetchClass] = useState(true);

	const [majorList, setMajorList] = useState([]);
	const [classList, setClassList] = useState([]);

	const [courseSchedule, setCourseSchedule] = useState('');
	const [courseName, setCourseName] = useState('');
	const [courseThumbnail, setCourseThumbnail] = useState('apple');

	const [courseListPage, setCourseListPage] = useState(0);

	const courseData = useSelector((state) => state.course).course;

	const dispatch = useDispatch();

	const thumbnailRef = useClickOutside(() => {
		setIsShowThumbnailSelect(false);
	});

	useEffect(() => {
		setValidation(courseName && courseSchedule);
	}, [courseName, courseSchedule]);

	useEffect(() => {
		setLoadingFetch(true);
		setLoadingFetchMajor(true);
		setLoadingFetchClass(true);

		getCourse()
			.then((res) => {
				dispatch(setCourse(res.data.data));
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetch(false);
			});

		getMajor()
			.then((res) => {
				setMajorList(res.data.data);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchMajor(false);
			});

		getClass()
			.then((res) => {
				setClassList(res.data.data);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchClass(false);
			});
	}, []);

	if (loadingFetch || loadingFetchMajor || loadingFetchClass) {
		return <LoopCircleLoading size="large" color="#4161ff" />;
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<Header
						breadCrumbData={{
							name: 'Kuis',
							links: [
								{ link: '/dashboard', title: 'Dashboard' },
								{ link: '/', title: 'Pembelajaran' },
								{ link: '/', title: 'Kuis' },
							],
						}}
					/>
					<div className={styles.headerContainer}>
						<div className="mb-4">
							<img src="/image/home-banner.png" alt="" className={styles.bannerImage} />
						</div>
					</div>
					{courseData.length != 0 ? (
						<div className={styles.kursusContainer}>
							<span className={styles.cardTitle}>Kursus Saya</span>
							<div className={styles.arrowContainer}>
								<FontAwesomeIcon
									icon={faArrowAltCircleLeft}
									className={courseListPage == 0 ? styles.arrowDisabled : styles.arrowLeft}
									onClick={
										courseListPage == 0 ? () => {} : () => setCourseListPage(courseListPage - 1)
									}
								/>
								<FontAwesomeIcon
									icon={faArrowAltCircleRight}
									className={
										courseListPage >= courseData.length / 7 - 1
											? styles.arrowDisabled
											: styles.arrowRight
									}
									onClick={
										courseListPage >= courseData.length / 7 - 1
											? () => {}
											: () => setCourseListPage(courseListPage + 1)
									}
								/>
							</div>
							<div className={styles.kursusCardContainer}>
								<div
									className={styles.kursusCardCreate}
									onClick={() => setIsShowCreateCourseModal(true)}>
									<div className={styles.kursusCardCreateAnimation}>
										<img src="/icon/add-course.svg" alt="" />
										<span className="text-lg">Tambah Kursus</span>
									</div>
								</div>
								{courseData.slice(courseListPage * 7, courseListPage * 7 + 3).map((item) => {
									return (
										<CardKursus
											key={item.ID}
											data={item}
											category={{
												class: classList,
												major: majorList,
											}}
										/>
									);
								})}
								{courseData.slice(courseListPage * 7 + 3, courseListPage * 7 + 7).map((item) => {
									return (
										<CardKursus
											key={item.ID}
											data={item}
											category={{
												class: classList,
												major: majorList,
											}}
										/>
									);
								})}
							</div>
						</div>
					) : (
						<div className={styles.emptyCourseContainer}>
							<div className={styles.emptyCourseTextContainer}>
								<span className={styles.emptyCourseText}>Belum ada Kursus, Buat Baru Yuk!</span>
								<span className={styles.emptyCourseDesc}>
									Siapkan kursus barumu dan mulailah berbagi ilmu dengan ribuan siswa di Indonesia
								</span>
								<div
									className={styles.emptyCourseCreate}
									onClick={() => setIsShowCreateCourseModal(true)}>
									<img
										className={styles.emptyCourseCreateImage}
										src="/icon/add-course.svg"
										alt=""
									/>
									<span className={styles.emptyCourseCreateText}>Tambah Kursus</span>
								</div>
							</div>
							<div className={styles.emptyCourseImageContainer}>
								<img src="/image/bg-homeEmpty.png" alt="" className={styles.emptyCourseImage} />
							</div>
						</div>
					)}
				</div>
			</div>
			<Modal
				open={isShowCreateCourseModal}
				onClose={() => {
					setCourseName('');
					setCourseSchedule('');
					setCourseThumbnail('apple');
					setIsShowCreateCourseModal(false);
				}}>
				<div className={styles.createCourseModalContainer}>
					<div className={styles.createCourseModalHeader}>
						<span className={styles.createCourseModalHeaderTitle}>Publish Kursus</span>
					</div>
					<div className={styles.createCourseForm}>
						<div className={styles.nameForm}>
							<span className={styles.createCourseModalLabel}>Nama Kursus</span>
							<input
								type="text"
								className={styles.nameInput}
								placeholder="Berikan nama course disini"
								onChange={(e) => {
									setCourseName(e.target.value);
								}}
								value={courseName}
							/>
						</div>
						<div className={styles.scheduleForm}>
							<span className={styles.createCourseModalLabel}>Jadwal Live Session</span>
							<input
								type="text"
								className={styles.scheduleInput}
								placeholder="Berikan jadwal pertemuan kelas"
								onChange={(e) => {
									setCourseSchedule(e.target.value);
								}}
								value={courseSchedule}
							/>
						</div>
						<div className={styles.thumbnailForm}>
							<span className={styles.createCourseModalLabel}>Thumbnail</span>
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
						<div className={styles.modalButtonContainer}>
							<Button
								type="Secondary"
								className={styles.modalButton}
								onClick={() => {
									setCourseName('');
									setCourseSchedule('');
									setCourseThumbnail('apple');
									setIsShowCreateCourseModal(false);
								}}>
								Batal
							</Button>
							<Button
								type={validation ? 'Primary' : 'Disabled'}
								className={styles.modalButton}
								onClick={() => {
									setLoadingCreateCourse(true);
									postCourse({
										course_name: courseName,
										live_session_week: courseSchedule,
										thumbnail: courseThumbnail,
									})
										.then((res) => {
											toast.success(res.data.message, {
												position: toast.POSITION.TOP_RIGHT,
											});
											dispatch(addCourse(res.data.data));
										})
										.catch((err) => {
											toast.error(err.response.data.message, {
												position: toast.POSITION.TOP_RIGHT,
											});
										})
										.finally(() => {
											setLoadingCreateCourse(false);
											setCourseName('');
											setCourseSchedule('');
											setCourseThumbnail('apple');
											setIsShowCreateCourseModal(false);
										});
								}}>
								<span>
									{loadingCreateCourse ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Buat Kursus'}
								</span>
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
