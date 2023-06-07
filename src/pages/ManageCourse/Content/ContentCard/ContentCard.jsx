import {
	faCalendarAlt,
	faEye,
	faUpRightFromSquare,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styles from './ContentCard.module.css';

export default function Quiz({ data }) {
	const [showVideoModal, setShowVideoModal] = useState(false);
	const [showFileModal, setShowFileModal] = useState(false);
	console.log(data);
	if (!data.name) return null;

	if (data.type === 'quiz') {
		return (
			<a className={styles.contentContainer} href={data.link} target="_blank" rel="noreferrer">
				<div className={styles.contentTitleContainer}>
					<span className={styles.dataName}>Lihat {data.name}</span>
					<FontAwesomeIcon icon={faUpRightFromSquare} className={styles.previewIcon} />
				</div>
			</a>
		);
	}

	if (data.type === 'video') {
		return (
			<>
				<div className={styles.contentContainer} onClick={() => setShowVideoModal(true)}>
					<div className={styles.contentTitleContainer}>
						<FontAwesomeIcon icon={faEye} className={styles.previewIconLeft} />
						<span className={styles.dataName}>Lihat {data.name}</span>
					</div>
				</div>
				<Modal open={showVideoModal} onClose={() => setShowVideoModal(false)}>
					<div className={styles.videoModal}>
						<div className={styles.closeIcon}>
							<FontAwesomeIcon icon={faXmark} onClick={() => setShowVideoModal(false)} />
						</div>
						<iframe title={data.name} width="100%" height="100%" src={data.src}></iframe>
					</div>
				</Modal>
			</>
		);
	}

	if (data.type === 'tugas') {
		return (
			<>
				<div className={styles.contentContainer} onClick={() => setShowFileModal(true)}>
					<div className={styles.contentTitleContainer}>
						<FontAwesomeIcon icon={faEye} className={styles.previewIconLeft} />
						<span className={styles.dataName}>Lihat {data.name}</span>
					</div>
					<div className={data.deadline ? styles.deadlineContainer : styles.noDeadlineContainer}>
						<FontAwesomeIcon icon={faCalendarAlt} className={styles.deadlineIcon} />
						{data.deadline ? (
							<span className={styles.noDeadline}>{data.deadline}</span>
						) : (
							<span className={styles.noDeadline}>Tidak ada deadline</span>
						)}
					</div>
				</div>
				<Modal open={showFileModal} onClose={() => setShowFileModal(false)}>
					<div className={styles.fileModal}>
						<div className={styles.closeIcon}>
							<FontAwesomeIcon icon={faXmark} onClick={() => setShowFileModal(false)} />
						</div>
						<iframe title={data.name} width="100%" height="100%" src={data.src}></iframe>
					</div>
				</Modal>
			</>
		);
	}

	if (data.type === 'materi') {
		return (
			<>
				<>
					<div className={styles.contentContainer} onClick={() => setShowFileModal(true)}>
						<div className={styles.contentTitleContainer}>
							<FontAwesomeIcon icon={faEye} className={styles.previewIconLeft} />
							<span className={styles.dataName}>Lihat {data.name}</span>
						</div>
					</div>
					<Modal open={showFileModal} onClose={() => setShowFileModal(false)}>
						<div className={styles.fileModal}>
							<div className={styles.closeIcon}>
								<FontAwesomeIcon icon={faXmark} onClick={() => setShowFileModal(false)} />
							</div>
							<iframe title={data.name} width="100%" height="100%" src={data.src}></iframe>
						</div>
					</Modal>
				</>
			</>
		);
	}
}
