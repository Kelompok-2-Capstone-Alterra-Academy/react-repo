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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { addSection, updateSection } from '../../../redux/actions/sectionActions';
import styles from './Sidebar.module.css';

export default function Sidebar({ show, onSelectSection, onSelectContent, selectedContent }) {
	const sectionList = useSelector((state) => state.section);
	const dispatch = useDispatch();

	return (
		<div className={classNames(styles.sidebar, !show && styles.hideSidebar)}>
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
					<span className={styles.menuTitle}>Sesi Materi ({sectionList.section.length})</span>
					<FontAwesomeIcon
						icon={faPlus}
						className={styles.menuAddIcon}
						onClick={() => {
							const newSection = {
								title: `Section x`,
								sectionTitle: `Section x`,
								isDrillDown: false,
								content: [],
							};
							dispatch(addSection(newSection));
						}}
					/>
				</div>
				{sectionList.section.map((section) => {
					return (
						<>
							<div className={styles.menuCourseContainer} key={section.id}>
								<div
									className={styles.menuCourse}
									onClick={() => {
										dispatch(
											updateSection({
												...section,
												isDrillDown: !section.isDrillDown,
											})
										);
										onSelectSection(section);
										onSelectContent({});
									}}>
									<div className={styles.menuCourseTitle}>
										<span className={styles.menuCourseTitleSection}>{section.sectionTitle}</span>
										<span className={styles.menuCourseTitleCourse}>{section.title}</span>
									</div>
									<div className={styles.menuCourseArrowContainer}>
										<FontAwesomeIcon
											icon={section.isDrillDown ? faArrowUp : faArrowDown}
											className={styles.menuArrowIcon}
										/>
									</div>
								</div>
							</div>
							{section.isDrillDown && (
								<div className={styles.modulContainer}>
									{section.content.map((content) => {
										return (
											<div
												key={content.id}
												className={classNames(
													styles.modulChild,
													content.id == selectedContent.id &&
														section.id == selectedContent.sectionId &&
														styles.modulChildSelected
												)}
												onClick={() => {
													onSelectSection(section);
													onSelectContent(content);
												}}>
												<span className={styles.modulType}>{content.type}</span>
												<div className={styles.modulContent}>
													<FontAwesomeIcon
														icon={
															content.type === 'Video'
																? faVideo
																: content.type === 'Materi'
																? faFileAlt
																: content.type === 'Tugas'
																? faTasks
																: content.type === 'Quiz'
																? faQuestionCircle
																: faVideo
														}
														className={styles.modulTypeIcon}
													/>
													<span className={styles.modulTitle}>
														{content.title ? content.title : 'Untitled Content'}
													</span>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
}
