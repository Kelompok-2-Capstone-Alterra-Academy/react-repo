import {
	faArrowAltCircleLeft,
	faArrowAltCircleRight,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse, postCourse } from '../../clients';
import { Button, CardKursus } from '../../components';
import { useClickOutside } from '../../hooks';
import { addCourse, setCourse } from '../../redux/actions/courseActions';
import styles from './Dashboard.module.css';

export default function Dashboard() {
	const [isShowCreateCourseModal, setIsShowCreateCourseModal] = useState(false);
	const [isShowThumbnailSelect, setIsShowThumbnailSelect] = useState(false);
	const [validation, setValidation] = useState(false);
	const [loadingFetch, setLoadingFetch] = useState(false);

	const [courseName, setCourseName] = useState('');
	const [courseSchedule, setCourseSchedule] = useState('');
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
		getCourse().then((res) => {
			setLoadingFetch(false);
			dispatch(setCourse(res.data.data));
		});
	}, []);

	if (loadingFetch) {
		return <LoopCircleLoading size="large" color="#4161ff" />;
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.headerContainer}>
						<div className="mb-4">
							<img src="/image/home-banner.png" alt="" className={styles.bannerImage} />
						</div>
						{/* <Header
							breadCrumbData={{
								name: 'Dashboard',
								links: [{ link: '/dashboard', title: 'Dashboard' }],
							}}
							profileData={{
								name: 'Aldi Taher',
								pic: 'https://avatars.githubusercontent.com/u/55269572?v=4',
								email: 'look_at_the_star@gmail.com',
								role: 'Instructor',
							}}
							className={styles.profile}
						/> */}
						<div className="flex justify-end gap-4">
							<button
								className="bg-blue-600 hover:bg-blue-500 text-white text-xs rounded inline-flex items-center"
								onClick={() => {
									window.location.href = '/modul';
								}}>
								<img src="/icon/icon-unggah.svg" className="mr-2" alt="" />
								<span>Kelola Modul</span>
							</button>
							<button
								className="bg-[#22BDFF] hover:bg-blue-600 text-white text-xs rounded inline-flex items-center"
								onClick={() => {
									window.location.href = '/quiz';
								}}>
								<img src="/icon/icon-plus.svg" className="mr-2" alt="" />
								<span>Tambah Quiz</span>
							</button>
						</div>
					</div>
					{courseData.length != 0 ? (
						<>
							<div className={styles.kursusContainer}>
								<span className={styles.cardTitle}>Kursus Saya</span>
								<div className={styles.kursusCardContainer}>
									<div
										className={styles.kursusCardCreate}
										onClick={() => setIsShowCreateCourseModal(true)}>
										<img src="/icon/add-course.svg" alt="" />
										<span className="text-xs">Tambah Kursus</span>
									</div>
									<div className={styles.kursusCard}>
										{courseData.slice(courseListPage * 3, courseListPage * 3 + 3).map((item) => {
											return <CardKursus key={item.ID} data={item} />;
										})}
										<div className={styles.arrowContainer}>
											<FontAwesomeIcon
												icon={faArrowAltCircleLeft}
												className={courseListPage == 0 ? styles.arrowDisabled : styles.arrowLeft}
												onClick={
													courseListPage == 0
														? () => {}
														: () => setCourseListPage(courseListPage - 1)
												}
											/>
											<FontAwesomeIcon
												icon={faArrowAltCircleRight}
												className={
													courseListPage >= courseData.length / 3 - 1
														? styles.arrowDisabled
														: styles.arrowRight
												}
												onClick={
													courseListPage >= courseData.length / 3 - 1
														? () => {}
														: () => setCourseListPage(courseListPage + 1)
												}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className={styles.statisticContainer}>
								<span className={styles.cardTitle}>Statistik</span>
								<div className={styles.statisticCardContainer}>
									<div className="h-20 bg-[#E1EFE1] rounded-md">
										<div className="flex p-1 items-center gap-6 justify-center">
											<img src="/image/stats-attendance.png" alt="" />
											<div>
												<p className="text-xs font-semibold text-[#388E3C]">Total siswa baru</p>
												<p className="text-xl font-semibold">120 Siswa</p>
											</div>
										</div>
									</div>
									<div className="h-20 bg-[#FFE0B2] rounded-md">
										<div className="flex p-1 items-center gap-6 justify-center">
											<img src="/image/stats-task.png" alt="" />
											<div>
												<p className="text-xs font-semibold text-[#E65100]">Tugas perlu dinilai</p>
												<p className="text-xl font-semibold">13 Tugas</p>
											</div>
										</div>
									</div>
									<div className="h-20 bg-[#F0FAFF] rounded-md">
										<div className="flex p-1 items-center gap-6 justify-center">
											<img src="/image/stats-time.png" alt="" />
											<div>
												<p className="text-xs font-semibold text-[#1976D2]">Akses rata-rata</p>
												<p className="text-xl font-semibold">40 Menit</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <div className="px-6 mt-6">
						<p className="font-bold">Analisis Siswa</p>
					</div>
					<div className="px-6 mt-4">
						<table className="table w-full border-gray-300 text-center">
							<thead>
								<tr>
									<th className="text-gray-600 font-semibold">No.</th>
									<th className="text-gray-600 font-semibold">Nama Siswa</th>
									<th className="text-gray-600 font-semibold">Waktu Pengumpulan</th>
									<th className="text-gray-600 font-semibold">Status</th>
									<th className="text-gray-600 font-semibold">Tindakan</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Joel</td>
									<td>25 April 2023 23.47</td>
									<td className="justify-center flex">
										<Tag className={styles.tag} type="Green">
											<span>Sudah dinilai</span>
										</Tag>
									</td>
								</tr>
							</tbody>
						</table>
					</div> */}
						</>
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
									postCourse({
										course_name: courseName,
										live_session_week: courseSchedule,
										thumbnail: courseThumbnail,
									})
										.then((res) => {
											dispatch(addCourse(res.data.data));
										})
										.catch((err) => {
											console.log(err);
										});
									setCourseName('');
									setCourseSchedule('');
									setCourseThumbnail('apple');
									setIsShowCreateCourseModal(false);
								}}>
								Buat Kursus
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
