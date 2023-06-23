import {
	faBars,
	faEdit,
	faFileAlt,
	faPlus,
	faQuestionCircle,
	faTasks,
	faTrash,
	faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	delSection,
	getCourse,
	getFolder,
	getModule,
	getQuiz,
	getSection,
	postModule,
	putSection,
} from '../../clients';
import { Button, ConfirmationModal, Header, Select } from '../../components';
import { useClickOutside } from '../../hooks';
import {
	addContent,
	deleteSection,
	setContent,
	setSection,
	updateSection,
} from '../../redux/actions/sectionActions';
import Content from './Content/Content';
import styles from './ManageCourse.module.css';
import Sidebar from './Sidebar/Sidebar';

export default function ManageCourse() {
	const [showSidebar, setShowSidebar] = useState(true);
	const [loadingFetchCourse, setLoadingFetchCourse] = useState(true);
	const [loadingFetchSection, setLoadingFetchSection] = useState(true);
	const [loadingFetchContent, setLoadingFetchContent] = useState(true);
	const [loadingFetchFolders, setLoadingFetchFolders] = useState(true);
	const [loadingFetchQuiz, setLoadingFetchQuiz] = useState(true);

	const [isSelectContent, setIsSelectContent] = useState(false);
	const [isEditingCourseName, setIsEditingCourseName] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [courseName, setCourseName] = useState('');
	const [sectionName, setSectionName] = useState('');

	const [selectedSection, setSelectedSection] = useState({});
	const [selectedContent, setSelectedContent] = useState({});
	const [folderList, setFolderList] = useState([]);
	const [quizList, setQuizList] = useState([]);

	const { id: courseId } = useParams();

	const data = useSelector((state) => state.section.section);

	const dispatch = useDispatch();

	const containerRef = useClickOutside(() => {
		setIsSelectContent(false);
	});

	const onEmptySelectedSection = () => {
		if (data.length > 0) {
			if (data[0].isDrillDown) {
				setSelectedSection(data[0]);
			} else {
				dispatch(
					updateSection({
						...data[0],
						isDrillDown: true,
					})
				);
			}
		}
	};

	useEffect(() => {
		if (Object.keys(selectedSection).length == 0) {
			onEmptySelectedSection();
		}
		setSectionName(selectedSection.section_name);
	}, [selectedSection, data]);

	useEffect(() => {
		setLoadingFetchCourse(true);
		setLoadingFetchSection(true);
		setLoadingFetchContent(true);
		setLoadingFetchFolders(true);
		setLoadingFetchQuiz(true);
		getCourse()
			.then((res) => {
				const name = res.data.data.find((course) => course.ID == courseId).course_name;
				setCourseName(name);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchCourse(false);
			});

		getSection()
			.then((res) => {
				const section = res.data.data.filter((section) => section.course_id == courseId);
				dispatch(
					setSection(
						section.map((section, index) => {
							return {
								...section,
								isDrillDown: index == 0,
							};
						})
					)
				);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchSection(false);
			});

		getModule()
			.then((res) => {
				dispatch(setContent(res.data.data));
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchContent(false);
			});

		getFolder()
			.then((res) => {
				setFolderList(res.data.data.folders);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchFolders(false);
			});

		getQuiz()
			.then((res) => {
				setQuizList(res.data.data);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchQuiz(false);
			});
	}, []);

	const handleClickOption = (type) => {
		const moduleName = type + '-';
		postModule({
			module_name: moduleName,
			section_id: selectedSection.ID,
		})
			.then((res) => {
				toast.success(res.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
				dispatch(addContent(res.data.data));
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
		setIsSelectContent(false);
	};

	const renderOption = (option) => {
		const icon = {
			materi: faFileAlt,
			quiz: faQuestionCircle,
			video: faVideo,
			tugas: faTasks,
		};

		return (
			<>
				<FontAwesomeIcon icon={icon[option]} className={styles.optionItemIcon} />
				<span>{option}</span>
			</>
		);
	};

	if (
		loadingFetchCourse ||
		loadingFetchSection ||
		loadingFetchContent ||
		loadingFetchFolders ||
		loadingFetchQuiz
	) {
		return <LoopCircleLoading size="large" color="#2196f3" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.barContainer}>
				<FontAwesomeIcon
					icon={faBars}
					className={styles.burger}
					onClick={() => setShowSidebar(!showSidebar)}
				/>
			</div>
			<div className={styles.content}>
				<Sidebar
					show={showSidebar}
					onSelectContent={(content) => {
						setSelectedContent(content);
					}}
					onSelectSection={(section) => {
						setSelectedSection(section);
					}}
					selectedContent={{
						sectionId: selectedSection.id ?? '',
						id: selectedContent.id ?? '',
					}}
					courseId={courseId}
				/>
				<div className={showSidebar ? styles.main : styles.mainWithoutSidebar}>
					<Header
						breadCrumbData={{
							name: courseName,
							links: [
								{
									link: '/dashboard',
									title: 'Dashboard',
								},
								{
									link: '/',
									title: 'Kursus Saya',
								},
								{
									link: `/course/${courseId}`,
									title: courseName,
								},
							],
						}}
					/>
					{Object.keys(selectedSection).length != 0 && (
						<div className={styles.controllerContainer} key={selectedSection.id}>
							<div className={styles.headerTitle}>
								{isEditingCourseName ? (
									<input
										type="text"
										className={styles.headerTitleInput}
										value={sectionName}
										onChange={(e) => setSectionName(e.target.value)}
										autoFocus
										maxLength={30}
										placeholder={'Masukkan nama kursus'}
										onBlur={() => setIsEditingCourseName(false)}
									/>
								) : (
									<div>
										<span
											className={
												sectionName == ''
													? styles.headerTitleCoursePlaceholder
													: styles.headerTitleCourse
											}>
											{sectionName || 'Masukkan nama kursus'}
										</span>
										<FontAwesomeIcon
											icon={faEdit}
											className={styles.headerTitleEditIcon}
											onClick={() => setIsEditingCourseName(true)}
										/>
									</div>
								)}
							</div>
							<div className={styles.headerButton}>
								<Button
									type="Danger"
									className={styles.button}
									onClick={() => setShowDeleteModal(true)}>
									<FontAwesomeIcon icon={faTrash} />
								</Button>
								<div
									className={styles.selectWrapper}
									onClick={() => setIsSelectContent(!isSelectContent)}
									ref={containerRef}>
									<Button type="Secondary" className={styles.button}>
										<FontAwesomeIcon icon={faPlus} />
									</Button>
									<Select
										isShow={isSelectContent}
										className={styles.contentSelection}
										options={{
											title: 'Jenis Konten',
											data: [
												{ id: 'video', option: renderOption('video') },
												{ id: 'materi', option: renderOption('materi') },
												{ id: 'tugas', option: renderOption('tugas') },
												{ id: 'quiz', option: renderOption('quiz') },
											],
										}}
										handleSelected={(id) => {
											handleClickOption(id);
										}}
									/>
								</div>
								<Button
									type="Primary"
									className={styles.button}
									onClick={() => {
										setShowSaveModal(true);
									}}>
									<span>Rename</span>
								</Button>
							</div>
							<ConfirmationModal
								title="Rename Section"
								image="/image/course-save.png"
								confirmationText="Apakah kamu yakin untuk menyimpan section ini?"
								primaryButtonName={'Rename'}
								onPrimaryButtonClick={() => {
									putSection({
										data: {
											...selectedSection,
											section_name: sectionName,
										},
										id: selectedSection.ID,
									})
										.then((res) => {
											toast.success(res.data.message, {
												position: toast.POSITION.TOP_RIGHT,
											});
											dispatch(
												updateSection({
													...res.data.data,
													isDrillDown: true,
												})
											);
											setSelectedSection({
												...res.data.data,
												isDrillDown: true,
											});
										})
										.catch((err) => {
											toast.error(err.response.data.message, {
												position: toast.POSITION.TOP_RIGHT,
											});
										})
										.finally(() => {
											setShowSaveModal(false);
										});
								}}
								onSecondaryButtonClick={() => {
									setShowSaveModal(false);
								}}
								secondaryButtonName={'Batal'}
								show={showSaveModal}
							/>
							<ConfirmationModal
								title="Hapus Section"
								image="/image/section-delete.png"
								confirmationText="Apakah kamu yakin untuk menghapus section ini?"
								primaryButtonName={'Hapus'}
								onPrimaryButtonClick={() => {
									delSection(selectedSection.ID)
										.then((res) => {
											toast.success(res.data.message, {
												position: toast.POSITION.TOP_RIGHT,
											});
											dispatch(deleteSection(selectedSection.ID));
										})
										.catch((err) => {
											toast.error(err.response.data.message, {
												position: toast.POSITION.TOP_RIGHT,
											});
										})
										.finally(() => {
											setSelectedSection({});
											setSelectedContent({});
											setShowDeleteModal(false);
										});
								}}
								onSecondaryButtonClick={() => {
									setShowDeleteModal(false);
								}}
								secondaryButtonName={'Batal'}
								show={showDeleteModal}
							/>
						</div>
					)}
					{Object.keys(selectedContent).length != 0 && (
						<Content
							selectedContent={selectedContent}
							onReset={() => setSelectedContent({})}
							folderList={folderList}
							quizList={quizList}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
