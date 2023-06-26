import {
	faCommentDots,
	faFolderOpen,
	faHomeUser,
	faPowerOff,
	faQuestionCircle,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCourse, logout } from '../../clients';
import { useClickOutside } from '../../hooks';
import { setCourse } from '../../redux/actions/courseActions';
import styles from '../Sidebar/Sidebar.module.css';

const Sidebar = () => {
	const [isCourseListOpen, setIsCourseListOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	const courseList = useSelector((state) => state.course.course);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const courseListRef = useClickOutside(() => {
		setIsCourseListOpen(false);
	});

	useEffect(() => {
		setLoading(true);
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
				setLoading(false);
			});
	}, []);

	return (
		<div className={styles.sidebar}>
			{loading ? (
				<LoopCircleLoading size="large" color="white" />
			) : (
				<>
					<div>
						<div className={styles.header}>
							<Link style={{ textDecoration: 'none' }} to="/dashboard" className={styles.logo}>
								<span className={styles.descriptionHeader}>StarMyDashboard</span>
							</Link>
						</div>
						<div className={styles.main}>
							<Link style={{ textDecoration: 'none' }} to="/dashboard" className={styles.listItem}>
								<FontAwesomeIcon icon={faHomeUser} className={styles.icon} />
								<span className={styles.description}>Dashboard</span>
							</Link>
							<Link style={{ textDecoration: 'none' }} to="/chat" className={styles.listItem}>
								<FontAwesomeIcon icon={faCommentDots} className={styles.icon} />
								<span className={styles.description}>Chat</span>
							</Link>
							<Link
								style={{ textDecoration: 'none' }}
								to="/manage-customer"
								className={styles.listItem}>
								<FontAwesomeIcon icon={faUsers} className={styles.icon} />
								<span className={styles.description}>Pelanggan</span>
							</Link>
							<Link style={{ textDecoration: 'none' }} to="/quiz" className={styles.listItem}>
								<FontAwesomeIcon icon={faQuestionCircle} className={styles.icon} />
								<span className={styles.description}>Quiz</span>
							</Link>
							<Link style={{ textDecoration: 'none' }} to="/modul" className={styles.listItem}>
								<FontAwesomeIcon icon={faFolderOpen} className={styles.icon} />
								<span className={styles.description}>Module</span>
							</Link>
							<Link
								style={{ textDecoration: 'none' }}
								className={styles.listCourse}
								onClick={() => setIsCourseListOpen(!isCourseListOpen)}
								ref={courseListRef}>
								<div className={styles.listCourseText}>
									<span>Kursus Saya</span>
									<span className={styles.courseListLength}>{courseList.length}</span>
								</div>
								<KeyboardArrowDownIcon style={{ color: '#212121' }} />
								{isCourseListOpen && (
									<div className={styles.courseListContainer}>
										<div className={styles.courseListOptionContainer}>
											{courseList.map((course) => (
												<Link
													key={course.ID}
													style={{ textDecoration: 'none' }}
													to={`/course/${course.ID}`}
													className={styles.courseListItem}>
													<span className={styles.courseListItemTitle}>{course.course_name}</span>
												</Link>
											))}
										</div>
									</div>
								)}
							</Link>
							<Link
								style={{ textDecoration: 'none' }}
								className={styles.logoutItem}
								onClick={() => {
									logout()
										.then((res) => {
											toast.success(res.data.message, {
												position: toast.POSITION.TOP_RIGHT,
											});
											document.cookie = 'token=;';
											navigate('/login');
										})
										.catch((err) => {
											toast.error(err.response.data.message, {
												position: toast.POSITION.TOP_RIGHT,
											});
										});
								}}>
								<FontAwesomeIcon icon={faPowerOff} className={styles.icon} />
								<span className={styles.description}>Keluar</span>
							</Link>
						</div>
					</div>
					<div className={styles.footer}>
						<span>Copyright ©2023 StarEdu</span>
						<span>All rights reserved.</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Sidebar;
