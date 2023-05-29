import styles from './Header.module.css';
import { Button, Select } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEdit,
	faPlus,
	faTrash,
	faFileAlt,
	faQuestionCircle,
	faVideo,
	faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
	const [isEditingCourseName, setIsEditingCourseName] = useState(false);
	const [courseName, setCourseName] = useState('Matematika Dasar');
	const [isEditingCourseSection, setIsEditingCourseSection] = useState(false);
	const [courseSection, setCourseSection] = useState('Section 1');
	const [isSelectContent, setIsSelectContent] = useState(false);

	const containerRef = useRef(null);

	const handleClickOutside = (event) => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setIsSelectContent(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

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
						}}
					>
						<input
							type="text"
							className={styles.headerTitleInput}
							value={courseName}
							onChange={(e) => setCourseName(e.target.value)}
							autoFocus
							maxLength={50}
						/>
					</form>
				) : (
					<div>
						<span
							className={
								courseName === '' ? styles.headerTitleCoursePlaceholder : styles.headerTitleCourse
							}
						>
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
						}}
					>
						<input
							type="text"
							className={styles.headerTitleSectionInput}
							value={courseSection}
							onChange={(e) => setCourseSection(e.target.value)}
							autoFocus
							maxLength={50}
						/>
					</form>
				) : (
					<div>
						<span
							className={
								courseSection === ''
									? styles.headerTitleSectionPlaceholder
									: styles.headerTitleSection
							}
						>
							{courseSection === '' ? 'Masukkan nama kursus' : courseSection}
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
				<Button type="Danger" className={styles.button}>
					<FontAwesomeIcon icon={faTrash} />
				</Button>
				<div
					className={styles.selectWrapper}
					onClick={() => setIsSelectContent(!isSelectContent)}
					ref={containerRef}
				>
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
						handleSelected={(id) => console.log(id)}
					/>
				</div>
				<Button type="Primary" className={styles.button}>
					<span>Simpan</span>
				</Button>
			</div>
		</div>
	);
}
