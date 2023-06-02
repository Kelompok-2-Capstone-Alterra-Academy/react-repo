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
import { deleteSection, updateSection } from '../../../redux/actions/sectionActions';
import styles from './Controller.module.css';

export default function Header({ data, onAddContent, onSave, onResetSection }) {
	const [isEditingCourseName, setIsEditingCourseName] = useState(false);
	const [courseName, setCourseName] = useState('');
	const [isEditingCourseSection, setIsEditingCourseSection] = useState(false);
	const [courseSection, setCourseSection] = useState('');
	const [isSelectContent, setIsSelectContent] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const dispatch = useDispatch();

	const containerRef = useClickOutside(() => {
		setIsSelectContent(false);
	});

	useEffect(() => {
		setCourseName(data.title);
		setCourseSection(data.sectionTitle);
	}, [data]);

	useEffect(() => {
		dispatch(
			updateSection({
				id: data.id,
				title: courseName,
				sectionTitle: courseSection,
			})
		);
	}, [courseName, courseSection]);

	const handleClickOption = (id) => {
		switch (id) {
			case 1:
				onAddContent({
					type: 'Video',
					title: '',
					video: 'https://youtube.com/embed/Z5NoQg8LdDk',
				});
				break;
			case 2:
				onAddContent({
					type: 'Materi',
					title: '',
					file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
					filePreview: 'https://picsum.photos/400/300',
					fileName: 'Materi Matematika Dasar.doc',
					fileSize: '78 kb',
				});
				break;
			case 3:
				onAddContent({
					type: 'Tugas',
					title: '',
					deadline: '',
					file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
					filePreview: 'https://picsum.photos/400/300',
					fileName: 'Materi Matematika Dasar.doc',
					fileSize: '78 kb',
					fileDesc: `Kerjakan Tugas Matematika Dasar pada dokumen dibawah ini. \n
							Jawaban di tulis tangan kemudian diFoto/discan dan kemudian diupload dalam bentuk pdf \n
							Nama file (no induk_nama_jenis latihan)`,
				});
				break;
			case 4:
				onAddContent({
					type: 'Quiz',
					title: '',
					quizName: 'Matematika Dasar',
					quizLink:
						'https://docs.google.com/forms/d/e/1FAIpQLSeoGW97EUf_NFU7m3Q-KplrzOJ5oYHlXETTegkMgnNgpBqYow/viewform?usp=sf_link',
				});
				break;
			default:
				break;
		}
		setIsSelectContent(false);
	};

	const renderOption = (option) => {
		const icon = {
			Materi: faFileAlt,
			Quiz: faQuestionCircle,
			Video: faVideo,
			Tugas: faTasks,
		};

		return (
			<>
				<FontAwesomeIcon icon={icon[option]} className={styles.optionItemIcon} />
				<span>{option}</span>
			</>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerTitle}>
				{isEditingCourseName ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setIsEditingCourseName(false);
						}}>
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
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setIsEditingCourseSection(false);
						}}>
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
								{ id: 1, option: renderOption('Video') },
								{ id: 2, option: renderOption('Materi') },
								{ id: 3, option: renderOption('Tugas') },
								{ id: 4, option: renderOption('Quiz') },
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
					onSave({
						title: courseName,
						sectionTitle: courseSection,
					});
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
					dispatch(deleteSection(data));
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
	);
}
