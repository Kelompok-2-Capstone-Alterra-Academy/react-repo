import { faPlus, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ConfirmationModal, Header, OutlineTag } from '../../components';
import { addQuiz, deleteQuiz, publishQuiz } from '../../redux/actions/quizActions';
import { truncateString } from '../../utilities/string';
import FormModal from './FormModal/FormModal';
import styles from './Quiz.module.css';

export default function Quiz() {
	const [showFormModal, setShowFormModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPublishModal, setShowPublishModal] = useState(false);

	const [selectedDeleteQuiz, setSelectedDeleteQuiz] = useState(null);
	const [selectedPublishQuiz, setSelectedPublishQuiz] = useState(null);

	const quizList = useSelector((state) => state.quiz).quiz;

	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<Header
				breadCrumbData={{
					name: 'Kuis',
					links: [
						{ link: '/dashboard', title: 'Dashboard' },
						{ link: '/', title: 'Pembelajaran' },
						{ link: '/', title: 'Kuis' },
					],
				}}
				profileData={{
					name: 'Admin',
					role: 'Admin',
					pic: 'https://i.pravatar.cc/150?img=21',
					email: 'testing@gmail.com',
				}}
			/>
			<div className={styles.header}>
				<span className={styles.headerTitle}>
					<b>{quizList.length}</b> Kuis telah dibuat
				</span>
				<Button
					className={styles.headerButton}
					type="Primary"
					onClick={() => setShowFormModal(true)}>
					<FontAwesomeIcon icon={faPlus} className={styles.headerButtonIcon} />
					Kuis Baru
				</Button>
			</div>
			{quizList.length != 0 && (
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
						<tbody className={styles.tableBody}>
							{quizList.map((item) => (
								<tr key={item.id}>
									<td>
										<span>{truncateString(item.name, 40)}</span>
									</td>
									<td span>
										<a href={item.link} target="_blank" rel="noreferrer" className={styles.preview}>
											<span>Lihat Preview</span>
											<FontAwesomeIcon icon={faUpRightFromSquare} className={styles.previewIcon} />
										</a>
									</td>
									<td>
										<OutlineTag
											type={item.status == 'Draf' ? 'Yellow' : 'Green'}
											className={styles.tag}>
											{item.status}
										</OutlineTag>
									</td>
									<td
										className={
											item.status == 'Draf'
												? styles.actionButtonContainer
												: styles.actionOneButtonContainer
										}>
										{item.status == 'Draf' && (
											<Button
												type="Primary"
												onClick={() => {
													setSelectedPublishQuiz(item.id);
													setShowPublishModal(true);
												}}
												className={styles.actionButton}>
												Terbitkan
											</Button>
										)}
										<Button
											type="Secondary"
											onClick={() => {
												setSelectedDeleteQuiz(item.id);
												setShowDeleteModal(true);
											}}
											className={styles.actionButton}>
											Hapus
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			<Modal open={showFormModal} onClose={() => setShowFormModal(false)}>
				<FormModal
					onClose={() => {
						setShowFormModal(false);
					}}
					onSubmit={(data) => {
						dispatch(addQuiz(data));
					}}
				/>
			</Modal>
			<ConfirmationModal
				show={showDeleteModal}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					dispatch(deleteQuiz(selectedDeleteQuiz));
					setShowDeleteModal(false);
				}}
				onSecondaryButtonClick={() => setShowDeleteModal(false)}
				title="Hapus Kuis?"
				image={'/image/quiz-delete.png'}
				confirmationText="Apakah Anda yakin ingin menghapus kuis ini?"
			/>

			<ConfirmationModal
				show={showPublishModal}
				primaryButtonName="Terbitkan"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					dispatch(publishQuiz(selectedPublishQuiz));
					setShowPublishModal(false);
				}}
				onSecondaryButtonClick={() => setShowPublishModal(false)}
				title="Terbitkan Kuis?"
				image={'/image/quiz-publish.png'}
				confirmationText="Apakah Anda yakin ingin menerbitkan kuis ini?"
			/>
		</div>
	);
}
