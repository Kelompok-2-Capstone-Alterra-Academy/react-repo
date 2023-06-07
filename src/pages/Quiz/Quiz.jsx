import { faPlus, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Button, ConfirmationModal, Header, OutlineTag } from '../../components';
import { truncateString } from '../../utilities/string';
import FormModal from './FormModal/FormModal';
import styles from './Quiz.module.css';
import { tempData } from './constants';

export default function Quiz() {
	const [showFormModal, setShowFormModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPublishModal, setShowPublishModal] = useState(false);

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.header}>
				<span className={styles.headerTitle}>
					<b>{tempData.data.length}</b> Kuis telah dibuat
				</span>
				<Button
					className={styles.headerButton}
					type="Primary"
					onClick={() => setShowFormModal(true)}>
					<FontAwesomeIcon icon={faPlus} className={styles.headerButtonIcon} />
					Kuis Baru
				</Button>
			</div>
			<div className={styles.content}>
				<table className={styles.table}>
					<thead className={styles.tableHeader}>
						<tr>
							<th>
								<span>Nama Kuis</span>
							</th>
							<th>
								<span>Preview Link</span>
							</th>
							<th>
								<span>Status</span>
							</th>
							<th>
								<span>Tindakan</span>
							</th>
						</tr>
						<div className={styles.splitter}></div>
					</thead>
					{tempData.data.length != 0 && (
						<tbody className={styles.tableBody}>
							{tempData.data.map((item) => (
								<tr key={item.id}>
									<td>
										<span>{item.namaKuis}</span>
									</td>
									<td>
										<a href={item.link}>{truncateString(item.link, 50)}</a>
									</td>
									<td>
										<span>
											<OutlineTag
												type={item.status == 'Draf' ? 'Yellow' : 'Green'}
												className={styles.tag}>
												{item.status}
											</OutlineTag>
										</span>
									</td>
									<td>
										<Button type="Primary" onClick={() => setShowPublishModal(true)}>
											Terbitkan
										</Button>
										<Button type="Secondary" onClick={() => setShowDeleteModal(true)}>
											Hapus
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
				{tempData.data.length == 0 && (
					<div className={styles.empty}>
						<FontAwesomeIcon icon={faXmarkCircle} className={styles.emptyIcon} />
						<span className={styles.emptyText}>Belum ada kuis yang dibuat</span>
						<span className={styles.emptyDesc}>
							Klik tombol <b>Kuis Baru</b> untuk membuat kuis baru
						</span>
					</div>
				)}
			</div>
			<Modal open={showFormModal} onClose={() => setShowFormModal(false)}>
				<FormModal
					closeFunction={() => {
						setShowFormModal(false);
					}}
				/>
			</Modal>
			<ConfirmationModal
				show={showDeleteModal}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => setShowDeleteModal(false)}
				onSecondaryButtonClick={() => setShowDeleteModal(false)}
				title="Hapus Kuis?"
				image={'/image/quiz-delete.png'}
				confirmationText="Apakah Anda yakin ingin menghapus kuis ini?"
			/>

			<ConfirmationModal
				show={showPublishModal}
				primaryButtonName="Terbitkan"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => setShowPublishModal(false)}
				onSecondaryButtonClick={() => setShowPublishModal(false)}
				title="Terbitkan Kuis?"
				image={'/image/quiz-publish.png'}
				confirmationText="Apakah Anda yakin ingin menerbitkan kuis ini?"
			/>
		</div>
	);
}
