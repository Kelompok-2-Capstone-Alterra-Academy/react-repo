import {
	faBookOpen,
	faCommentDots,
	faHomeUser,
	faPowerOff,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../clients';
import { useClickOutside } from '../../hooks';
import styles from '../Sidebar/Sidebar.module.css';

const Sidebar = () => {
	const [isCourseListOpen, setIsCourseListOpen] = useState(false);
	const [isLearningListOpen, setIsLearningListOpen] = useState(false);

	const courseList = useSelector((state) => state.course.course);

	const navigate = useNavigate();

	const courseListRef = useClickOutside(() => {
		setIsCourseListOpen(false);
	});

	const learningListRef = useClickOutside(() => {
		setIsLearningListOpen(false);
	});

	return (
		<div className={styles.sidebar}>
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
					<Link
						style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}
						className={styles.listLearning}
						onClick={() => setIsLearningListOpen(!isLearningListOpen)}
						ref={learningListRef}>
						<div>
							<FontAwesomeIcon icon={faBookOpen} className={styles.icon} />
							<span className={styles.description}>Pembelajaran</span>
						</div>
						<KeyboardArrowDownIcon style={{ color: 'white' }} />
						{isLearningListOpen && (
							<div className={styles.learningListContainer}>
								<Link
									style={{ textDecoration: 'none' }}
									to={`/modul`}
									className={styles.learningListItem}>
									<span className={styles.learningListItemTitle}>Kelola Modul</span>
								</Link>
								<Link
									style={{ textDecoration: 'none' }}
									to={`/quiz`}
									className={styles.learningListItem}>
									<span className={styles.learningListItemTitle}>Kelola Quiz</span>
								</Link>
							</div>
						)}
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
									document.cookie = 'token=;';
									toast.success(res.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
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
		</div>
	);
};

export default Sidebar;
