import {
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
import { useDispatch } from 'react-redux';
import { Button, ConfirmationModal, Select } from '../../../components';
import { useClickOutside } from '../../../hooks';
import { addContent, deleteSection, updateSection } from '../../../redux/actions/sectionActions';
import Content from '../Content/Content';
import styles from './Controller.module.css';

export default function Controller({
	selectedSection,
	selectedContent,
	onResetSection,
	onResetContent,
}) {
	const [courseName, setCourseName] = useState('');
	const [courseSection, setCourseSection] = useState('');
	const [isEditingCourseName, setIsEditingCourseName] = useState(false);
	const [isEditingCourseSection, setIsEditingCourseSection] = useState(false);

	const [isSelectContent, setIsSelectContent] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const dispatch = useDispatch();

	const containerRef = useClickOutside(() => {
		setIsSelectContent(false);
	});

	useEffect(() => {
		setCourseName(selectedSection.title);
		setCourseSection(selectedSection.sectionTitle);
	}, [selectedSection]);

	useEffect(() => {
		dispatch(
			updateSection({
				id: selectedSection.id,
				title: courseName,
				sectionTitle: courseSection,
			})
		);
	}, [courseName, courseSection]);

	const onAddContent = (content) => {
		dispatch(
			addContent({
				sectionId: selectedSection.id,
				content: content,
			})
		);
	};

	const handleClickOption = (id) => {
		onAddContent({
			type: id,
			title: '',
			name: '',
			desc: '',
			src: '',
			deadline: '',
			preview: '',
			size: '',
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

	if (Object.keys(selectedSection).length === 0) {
		return;
	}

	return (
		<>
			<div className={styles.container} key={selectedSection.id}>
				<div className={styles.headerTitle}>
					{isEditingCourseName ? (
						<form>
							<input
								type="text"
								className={styles.headerTitleInput}
								value={courseName}
								onChange={(e) => setCourseName(e.target.value)}
								autoFocus
								maxLength={50}
								placeholder={'Masukkan nama kursus'}
								onBlur={() => setIsEditingCourseName(false)}
							/>
						</form>
					) : (
						<div>
							<span
								className={
									courseName === '' ? styles.headerTitleCoursePlaceholder : styles.headerTitleCourse
								}>
								{courseName === '' ? 'Masukkan nama kursus' : courseName}
							</span>
							<FontAwesomeIcon
								icon={faEdit}
								className={styles.headerTitleEditIcon}
								onClick={() => setIsEditingCourseName(true)}
							/>
						</div>
					)}
					{isEditingCourseSection ? (
						<form>
							<input
								type="text"
								className={styles.headerTitleSectionInput}
								value={courseSection}
								onChange={(e) => setCourseSection(e.target.value)}
								autoFocus
								maxLength={50}
								placeholder={'Masukkan nama section'}
								onBlur={() => setIsEditingCourseSection(false)}
							/>
						</form>
					) : (
						<div>
							<span
								className={
									courseSection === ''
										? styles.headerTitleSectionPlaceholder
										: styles.headerTitleSection
								}>
								{courseSection === '' ? 'Masukkan nama section' : courseSection}
							</span>
							<FontAwesomeIcon
								icon={faEdit}
								className={styles.headerTitleSectionEditIcon}
								onClick={() => setIsEditingCourseSection(true)}
							/>
						</div>
					)}
				</div>
				<div className={styles.headerButton}>
					<Button type="Danger" className={styles.button} onClick={() => setShowDeleteModal(true)}>
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
						<span>Simpan</span>
					</Button>
				</div>
				<ConfirmationModal
					title="Simpan Section"
					image="/image/course-save.png"
					confirmationText="Apakah kamu yakin untuk menyimpan section ini?"
					primaryButtonName={'Simpan'}
					onPrimaryButtonClick={() => {
						dispatch(
							updateSection({
								id: selectedSection.id,
								title: courseName,
								sectionTitle: courseSection,
							})
						);
						setShowSaveModal(false);
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
						dispatch(deleteSection(selectedSection));
						onResetSection();
						setShowDeleteModal(false);
					}}
					onSecondaryButtonClick={() => {
						setShowDeleteModal(false);
					}}
					secondaryButtonName={'Batal'}
					show={showDeleteModal}
				/>
			</div>
			{Object.keys(selectedContent).length !== 0 && (
				<Content
					data={selectedContent}
					sectionId={selectedSection.id}
					onResetContent={onResetContent}
				/>
			)}
		</>
	);
}
