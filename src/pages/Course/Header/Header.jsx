import styles from './Header.module.css';
import { Button } from '../../../components';
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
import { useState } from 'react';
import { tempData } from '../constans';

export default function Header() {
	const [isEditingCourseName, setIsEditingCourseName] = useState(false);
	const [courseName, setCourseName] = useState('Matematika Dasar');
	const [isEditingCourseSection, setIsEditingCourseSection] = useState(false);
	const [courseSection, setCourseSection] = useState('Section 1');
	const [isSelectContent, setIsSelectContent] = useState(false);

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
				<div className={styles.selectWrapper} onClick={() => setIsSelectContent(!isSelectContent)}>
					<Button type="Secondary" className={styles.button}>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
					{isSelectContent && (
						<div className={styles.optionContainer}>
							<span className={styles.selectTitle}>Jenis Konten</span>
							<div className={styles.option}>
								{tempData.contentType.map((item) => (
									<div
										key={item.id}
										className={styles.optionItem}
										onClick={() => {
											setIsSelectContent(false);
										}}
									>
										<FontAwesomeIcon
											icon={
												item.name == 'Video'
													? faVideo
													: item.name == 'Materi'
													? faFileAlt
													: item.name == 'Tugas'
													? faTasks
													: item.name == 'Quiz'
													? faQuestionCircle
													: faVideo
											}
											className={styles.optionItemIcon}
										/>
										{item.name}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				<Button type="Primary" className={styles.button}>
					<span>Simpan</span>
				</Button>
			</div>
		</div>
	);
}
