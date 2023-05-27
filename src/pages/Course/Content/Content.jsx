import styles from './Content.module.css';
import { Button } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Content({ type }) {
	const [isEditingContentName, setIsEditingContentName] = useState(false);
	const [contentName, setContentName] = useState('Matematika Dasar');
	const [isSelectContent, setIsSelectContent] = useState(false);

	const placeholder = {
		video: 'Masukkan nama video materi disini',
		file: 'Masukkan nama file materi disini',
		quiz: 'Masukkan nama quiz materi disini',
		materi: 'Masukkan nama materi disini',
		default: 'Masukkan nama video materi disini',
	};

	const placeholderValue = placeholder[type] || placeholder.default;

	return (
		<div className={styles.container}>
			<div className={styles.contentTitleContainer}>
				{isEditingContentName ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setIsEditingContentName(false);
						}}
					>
						<input
							type="text"
							className={styles.contentTitleInput}
							value={contentName}
							onChange={(e) => setContentName(e.target.value)}
							autoFocus
							maxLength={50}
							placeholder={placeholderValue}
							onBlur={() => setIsEditingContentName(false)}
						/>
					</form>
				) : (
					<div>
						<span
							className={contentName === '' ? styles.contentTitlePlaceholder : styles.contentTitle}
						>
							{contentName === '' ? placeholderValue : contentName}
						</span>
						<FontAwesomeIcon
							icon={faEdit}
							className={styles.contentTitleEditIcon}
							onClick={() => setIsEditingContentName(true)}
						/>
					</div>
				)}
			</div>
			<div className={styles.contentButton}>
				<Button type="Danger" className={styles.button}>
					<FontAwesomeIcon icon={faTrash} />
				</Button>
				<div className={styles.selectWrapper} onClick={() => setIsSelectContent(!isSelectContent)}>
					<Button type="Primary" className={styles.button}>
						<span>Tambahkan Media</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
