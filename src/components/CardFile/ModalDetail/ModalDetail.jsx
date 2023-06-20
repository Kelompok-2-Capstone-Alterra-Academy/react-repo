import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../ModalDetail/ModalDetail.module.css';

const ModalDetail = ({ attachment }) => {
	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Detail File Modul</span>
			<a
				href={attachment.attachment_source}
				target="_blank"
				rel="noreferrer"
				className={styles.link}>
				Lihat File
				<FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.icon} />
			</a>
			<div className={styles.content}>
				<table className={styles.table}>
					<tr>
						<td className={styles.title}>Judul</td>
						<td className={styles.value}>{attachment.attachment_name}</td>
					</tr>
					<tr>
						<td className={styles.title}>Tanggal Unggah</td>
						<td className={styles.value}>{attachment.CreatedAt.substring(0, 10)}</td>
					</tr>
					<tr>
						<td className={styles.title}>Tipe</td>
						<td className={styles.value}>Dokument</td>
					</tr>
					<tr>
						<td className={styles.title}>Dibuka</td>
						<td className={styles.value}>29 April 2023, 09.00 WIB</td>
					</tr>
				</table>
			</div>
		</div>
	);
};

export default ModalDetail;
