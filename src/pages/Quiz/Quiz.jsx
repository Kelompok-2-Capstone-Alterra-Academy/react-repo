import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Quiz.module.css';
import { Button, OutlineTag } from '../../components';
import { tempData } from './constants';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormModal from './FormModal/FormModal';
import DeleteModal from './DeleteModal/DeleteModal';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

export default function Quiz() {
	const [showFormModal, setShowFormModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.headerTitle}>
					<b>{tempData.totalQuiz}</b> Kuis telah dibuat
				</span>
				<Button
					className={styles.headerButton}
					type="Primary"
					onClick={() => setShowFormModal(true)}
				>
					<FontAwesomeIcon icon={faPlus} className={styles.headerButtonIcon} />
					Kuis Baru
				</Button>
			</div>
			<div className={styles.content}>
				{tempData.data.length != 0 && (
					<table className={styles.table}>
						<thead className={styles.tableHeader}>
							<tr>
								<th>
									<span>Nama Kuis</span>
								</th>
								<th>
									<span>Kelas</span>
								</th>
								<th>
									<span>Mata Pelajaran</span>
								</th>
								<th>
									<span>Jurusan</span>
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
						<tbody className={styles.tableBody}>
							{tempData.data.map((item) => (
								<tr key={item.id}>
									<td>
										<span>{item.namaKuis}</span>
									</td>
									<td>
										<span>{item.kelas}</span>
									</td>
									<td>
										<span>{item.mataPelajaran}</span>
									</td>
									<td>
										<span>{item.jurusan}</span>
									</td>
									<td>
										<span>
											<OutlineTag
												type={item.status == 'Draf' ? 'Yellow' : 'Green'}
												className={styles.tag}
											>
												{item.status}
											</OutlineTag>
										</span>
									</td>
									<td>
										<Button type="Primary">Terbitkan</Button>
										<Button type="Secondary" onClick={() => setShowDeleteModal(true)}>
											Hapus
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
			{showFormModal && (
				<Modal open={showFormModal} onClose={() => setShowFormModal(false)}>
					<FormModal
						closeFunction={() => {
							setShowFormModal(false);
						}}
					/>
				</Modal>
			)}
			{showDeleteModal && (
				<Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
					<DeleteModal
						closeFunction={() => {
							setShowDeleteModal(false);
						}}
					/>
				</Modal>
			)}
		</div>
	);
}
