import { faPlus, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { delAttachment, getQuiz, putAttachment } from '../../clients';
import { Button, ConfirmationModal, Header, OutlineTag } from '../../components';
import { deleteQuiz, setQuiz, toggleStatusQuiz } from '../../redux/actions/quizActions';
import { truncateString } from '../../utilities/string';
import FormModal from './FormModal/FormModal';
import styles from './Quiz.module.css';

export default function Quiz() {
	const [showFormModal, setShowFormModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPublishModal, setShowPublishModal] = useState(false);

	const [loading, setLoading] = useState(true);

	const [selectedDeleteQuiz, setSelectedDeleteQuiz] = useState(null);
	const [selectedPublishQuiz, setSelectedPublishQuiz] = useState(null);

	const quizList = useSelector((state) => state.quiz.quiz);

	const dispatch = useDispatch();

	useEffect(() => {
		getQuiz()
			.then((res) => {
				console.log(res.data.data);
				dispatch(setQuiz(res.data.data));
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <LoopCircleLoading size="large" color="#4161ff" />;
	}

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
								<tr key={item.ID}>
									<td>
										<span>{truncateString(item.attachment_name, 40)}</span>
									</td>
									<td span>
										<a
											href={item.attachment_source}
											target="_blank"
											rel="noreferrer"
											className={styles.preview}>
											<span>Lihat Preview</span>
											<FontAwesomeIcon icon={faUpRightFromSquare} className={styles.previewIcon} />
										</a>
									</td>
									<td>
										<OutlineTag
											type={item.status == 'draft' ? 'Yellow' : 'Green'}
											className={styles.tag}>
											{item.status}
										</OutlineTag>
									</td>
									<td className={styles.actionButtonContainer}>
										<Button
											type={item.status == 'draft' ? 'Primary' : 'Secondary'}
											onClick={() => {
												setSelectedPublishQuiz(item);
												setShowPublishModal(true);
											}}
											className={styles.actionButton}>
											{item.status == 'draft' ? 'Terbitkan' : 'Tarik Kembali'}
										</Button>
										<Button
											type="Danger"
											onClick={() => {
												setSelectedDeleteQuiz(item);
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
				/>
			</Modal>
			<ConfirmationModal
				show={showDeleteModal}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => {
					console.log(selectedDeleteQuiz);
					delAttachment(selectedDeleteQuiz.ID)
						.then((res) => {
							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(deleteQuiz(selectedDeleteQuiz.ID));
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						});

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
					putAttachment({
						id: selectedPublishQuiz.ID,
						data: {
							ID: selectedPublishQuiz.ID,
							status: selectedPublishQuiz.status == 'draft' ? 'terbit' : 'draft',
						},
					})
						.then((res) => {
							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(toggleStatusQuiz(selectedPublishQuiz.ID));
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						});

					setShowPublishModal(false);
				}}
				onSecondaryButtonClick={() => setShowPublishModal(false)}
				title={selectedPublishQuiz?.status == 'draft' ? 'Terbitkan Kuis?' : 'Tarik Kembali Kuis?'}
				image={
					selectedPublishQuiz?.status == 'draft'
						? '/image/quiz-created.png'
						: '/image/quiz-publish.png'
				}
				confirmationText={
					selectedPublishQuiz?.status == 'draft'
						? 'Apakah Anda yakin ingin menerbitkan kuis ini?'
						: 'Apakah Anda yakin ingin menarik kembali kuis ini?'
				}
			/>
		</div>
	);
}
