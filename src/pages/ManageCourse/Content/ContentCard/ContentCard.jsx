import { faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import styles from './ContentCard.module.css';

export default function ContentCard({ data }) {
	const [showVideoModal, setShowVideoModal] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);

	const [contentType, setContentType] = useState('');

	useEffect(() => {
		setContentType(data.module_name.split('-')[0]);
	}, [data]);

	if (!data.attachment_id) return null;

	if (contentType == 'quiz') {
		return (
			<a
				className={styles.contentContainer}
				href={data.attachment.attachment_source}
				target="_blank"
				rel="noreferrer">
				<div id="contentTitleContainer" className={styles.contentTitleContainer}>
					<span id="dataName" className={styles.dataName}>
						{data.attachment.attachment_name}
					</span>
					<FontAwesomeIcon
						id="previewIcon"
						icon={faUpRightFromSquare}
						className={styles.previewIcon}
					/>
				</div>
			</a>
		);
	}

	if (contentType == 'video') {
		const sourceId = data.attachment.attachment_source.match(/[?&]v=([^&#]*)/);
		const embedUrl =
			'https://www.youtube.com/embed/' + (sourceId && sourceId[1] ? sourceId[1] : null);

		return (
			<>
				<div
					id="contentContainer"
					className={styles.contentContainer}
					onClick={() => setShowVideoModal(true)}>
					<div id="contentTitleContainer" className={styles.contentTitleContainer}>
						<span id="dataName" className={styles.dataName}>
							{data.attachment.attachment_name}
						</span>
						<FontAwesomeIcon
							id="previewIcon"
							icon={faUpRightFromSquare}
							className={styles.previewIcon}
						/>
					</div>
				</div>
				<Modal open={showVideoModal} onClose={() => setShowVideoModal(false)}>
					<div className={styles.videoModal}>
						<div className={styles.closeIcon}>
							<FontAwesomeIcon
								id="closeIcon"
								icon={faXmark}
								onClick={() => setShowVideoModal(false)}
							/>
						</div>
						<iframe
							id="videoFrame"
							title={data.attachment.attachment_name}
							width="100%"
							height="100%"
							src={embedUrl}></iframe>
					</div>
				</Modal>
			</>
		);
	}

	if (contentType == 'tugas' || contentType == 'materi') {
		return (
			<>
				<div
					id="contentContainer"
					className={styles.contentContainer}
					onClick={() => setShowFileModal(true)}>
					<div id="contentTitleContainer" className={styles.contentTitleContainer}>
						<span id="dataName" className={styles.dataName}>
							{data.attachment.attachment_name}
						</span>
						<FontAwesomeIcon
							id="previewIcon"
							icon={faUpRightFromSquare}
							className={styles.previewIcon}
						/>
					</div>
				</div>
				<Modal open={showFileModal} onClose={() => setShowFileModal(false)}>
					<div className={styles.fileModal}>
						<div className={styles.closeIcon}>
							<FontAwesomeIcon
								id="closeIcon"
								icon={faXmark}
								onClick={() => setShowFileModal(false)}
							/>
						</div>
						<iframe
							id="fileFrame"
							title={data.attachment.attachment_name}
							width="100%"
							height="100%"
							src={data.attachment.attachment_source}></iframe>
					</div>
				</Modal>
			</>
		);
	}
}
