import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Course.module.css';
import {
	faArrowDown,
	faArrowUp,
	faBookBookmark,
	faFileAlt,
	faPeopleGroup,
	faPlus,
	faQuestionCircle,
	faTasks,
	faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import NavBar from './NavBar/Navbar';
import Header from './Header/Header';
import Content from './Content/Content';
import classNames from 'classnames/bind';
import { tempData } from './constans';

export default function Course() {
	const [showModulChild, setShowModulChild] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className={styles.container}>
			<NavBar onCloseSidebar={() => setShowSidebar(!showSidebar)} />
			<div className={styles.content}>
				<div className={classNames(styles.sidebar, showSidebar && styles.hideSidebar)}>
					<div>
						<span className={styles.menuTitle}>Kursus Saya</span>
						<div className={styles.menuBoxContainer}>
							<div className={styles.menuBoxSelected}>
								<FontAwesomeIcon icon={faBookBookmark} className={styles.menuIcon} />
								<span>Matematika</span>
							</div>
							<div className={styles.menuBox}>
								<FontAwesomeIcon icon={faPeopleGroup} className={styles.menuParticipantIcon} />
								<span>Partisipan</span>
							</div>
						</div>
					</div>
					<div>
						<div className={styles.menuTitleContainer}>
							<span className={styles.menuTitle}>Sesi Materi (1)</span>
							<FontAwesomeIcon icon={faPlus} className={styles.menuAddIcon} />
						</div>
						<div className={styles.menuCourseContainer}>
							<div className={styles.menuCourse}>
								<div className={styles.menuCourseTitle}>
									<span className={styles.menuCourseTitleSection}>Section 1</span>
									<span className={styles.menuCourseTitleCourse}>Matematika Dasar</span>
								</div>
								<div className={styles.menuCourseArrowContainer}>
									<FontAwesomeIcon
										icon={showModulChild ? faArrowUp : faArrowDown}
										className={styles.menuArrowIcon}
										onClick={() => setShowModulChild(!showModulChild)}
									/>
								</div>
							</div>
						</div>
						{showModulChild && (
							<div className={styles.modulContainer}>
								{tempData.modul.map((item) => {
									return (
										<div
											key={item.id}
											className={classNames(
												styles.modulChild,
												item.id == 4 && styles.modulChildSelected
											)}
										>
											<span className={styles.modulType}>{item.type}</span>
											<div className={styles.modulContent}>
												<FontAwesomeIcon
													icon={
														item.type === 'Video'
															? faVideo
															: item.type === 'Materi'
															? faFileAlt
															: item.type === 'Tugas'
															? faTasks
															: item.type === 'Quiz'
															? faQuestionCircle
															: faVideo
													}
													className={styles.modulTypeIcon}
												/>
												<span className={styles.modulTitle}>{item.name}</span>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
				<div className={styles.main}>
					<Header />
					<Content type={'video'} />
					<Content type={'materi'} />
					<Content type={'tugas'} />
					<Content type={'quiz'} />
				</div>
			</div>
		</div>
	);
}
