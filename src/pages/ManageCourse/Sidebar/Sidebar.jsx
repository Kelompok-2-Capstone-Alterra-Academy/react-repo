import {
	faChevronDown,
	faChevronUp,
	faFileAlt,
	faHomeUser,
	faPlus,
	faQuestionCircle,
	faTasks,
	faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { postSection } from '../../../clients';
import { addSection, updateSection } from '../../../redux/actions/sectionActions';
import styles from './Sidebar.module.css';

export default function Sidebar({
	show,
	onSelectSection,
	onSelectContent,
	selectedContent,
	courseId,
}) {
	const sectionList = useSelector((state) => state.section).section;
	const contentList = useSelector((state) => state.section).content;
	const dispatch = useDispatch();

	return (
		<div className={classNames(styles.sidebar, !show && styles.hideSidebar)} id="sidebar">
			<div
				className={styles.menuBox}
				id="backToDashboard"
				onClick={() => {
					window.location.href = '/dashboard';
				}}>
				<FontAwesomeIcon icon={faHomeUser} className={styles.menuParticipantIcon} />
				<span>Kembali ke Dashboard</span>
			</div>
			<div className={styles.sectionListContainer}>
				<div className={styles.menuTitleContainer}>
					<span className={styles.menuTitle} id="sectionTitle">
						Sesi Materi ({sectionList.length})
					</span>
					<FontAwesomeIcon
						id="addSectionIcon"
						icon={faPlus}
						className={styles.menuAddIcon}
						onClick={() => {
							const newSection = {
								section_name: '',
								course_id: courseId,
							};
							postSection(newSection)
								.then((res) => {
									toast.success(res.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									dispatch(addSection(res.data.data));
								})
								.catch((err) => {
									toast.error(err.response.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
								});
						}}
					/>
				</div>
				{sectionList.map((section, index) => {
					return (
						<>
							<div className={styles.menuCourseContainer} key={section.id}>
								<div
									className={styles.menuCourse}
									id={`section-${index + 1}`}
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
										<span className={styles.menuCourseTitleSection}>{`Section-${index + 1}`}</span>
										<span className={styles.menuCourseTitleCourse}>
											{section.section_name ? section.section_name : 'Untitled'}
										</span>
									</div>
									<div className={styles.menuCourseArrowContainer}>
										<FontAwesomeIcon
											icon={section.isDrillDown ? faChevronUp : faChevronDown}
											className={styles.menuArrowIcon}
										/>
									</div>
								</div>
							</div>
							{section.isDrillDown && (
								<div className={styles.modulContainer}>
									{contentList
										.filter((content) => content.section_id == section.ID)
										.map((content) => {
											const contentType = content.module_name.split('-')[0];
											const contentName = content.module_name.split('-').slice(1).join('-');
											return (
												<div
													key={content.ID}
													id={`content-${content.ID}`}
													className={classNames(
														styles.modulChild,
														content.ID == selectedContent.ID &&
															section.ID == selectedContent.sectionId &&
															styles.modulChildSelected
													)}
													onClick={() => {
														onSelectSection(section);
														onSelectContent(content);
													}}>
													<span className={styles.modulType}>{contentType}</span>
													<div className={styles.modulContent}>
														<FontAwesomeIcon
															icon={
																{
																	video: faVideo,
																	materi: faFileAlt,
																	tugas: faTasks,
																	quiz: faQuestionCircle,
																}[contentType]
															}
															className={styles.modulTypeIcon}
														/>
														<span className={styles.modulTitle}>
															{contentName || 'Untitled Content'}
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
