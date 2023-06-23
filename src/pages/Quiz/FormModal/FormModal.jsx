import {
	faCheckCircle,
	faInfoCircle,
	faRotateRight,
	faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { postAttachment } from '../../../clients';
import { Button } from '../../../components';
import { addQuiz } from '../../../redux/actions/quizActions';
import styles from './FormModal.module.css';

export default function FormModal({ onClose }) {
	const [form, setForm] = useState({
		attachment_name: '',
		attachment_source: '',
	});
	const [formValidation, setFormValidation] = useState(false);
	const [isCheckingGForm, setIsCheckingGForm] = useState(false);
	const [checkingGFormLoading, setCheckingGFormLoading] = useState(false);
	const [isValidGForm, setIsValidGForm] = useState(false);
	const [isSuccessCreateQuiz, setIsSuccessCreateQuiz] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (form.attachment_name !== '' && form.attachment_source !== '' && isValidGForm) {
			setFormValidation(true);
		} else {
			setFormValidation(false);
		}
	}, [form, isValidGForm]);

	const checkGFormExistence = (url) => {
		const regex =
			/^https?:\/\/(docs\.google\.com\/forms\/[a-zA-Z0-9_-]+|forms\.gle\/[a-zA-Z0-9_-]+)/;
		const isValidURL = regex.test(url);
		return isValidURL;
	};

	const handleClickCheckingGForm = () => {
		setCheckingGFormLoading(true);

		setTimeout(() => {
			setCheckingGFormLoading(false);
			setIsCheckingGForm(true);
			setIsValidGForm(checkGFormExistence(form.attachment_source));
		}, 1000);
	};

	return (
		<div className={styles.container}>
			{isSuccessCreateQuiz ? (
				<>
					<span className={styles.createdHeaderTitle}>Kuis Baru Dibuat!</span>
					<div className={styles.createdContent}>
						<img src={'/image/quiz-created.png'} className={styles.createdImage} />
						<span>Kuis baru berhasil dibuat, terbitkan segera!</span>
					</div>
					<div className={styles.createdFooter}>
						<Button
							type="Secondary"
							onClick={() => {
								setIsSuccessCreateQuiz(false);
								onClose();
							}}>
							Tutup
						</Button>
					</div>
				</>
			) : (
				<>
					<span className={styles.headerTitle}>Form Membuat Quiz</span>
					<div className={styles.content}>
						<form className={styles.form}>
							<div className={styles.formGroup}>
								<span className={styles.label}>Nama Quiz</span>
								<input
									className={styles.input}
									type="text"
									placeholder="Masukkan Nama Quiz"
									value={form.attachment_name}
									onChange={(e) => setForm({ ...form, attachment_name: e.target.value })}
								/>
							</div>
							<div className={styles.formGroup}>
								<span className={styles.label}>Link G-Form</span>
								<div className={styles.inputCheckingContainer}>
									<input
										className={styles.inputChecking}
										type="text"
										placeholder="Masukkan Link G-Form"
										value={form.attachment_source}
										onChange={(e) => {
											setForm({ ...form, attachment_source: e.target.value });
											setIsValidGForm(false);
											setIsCheckingGForm(false);
										}}
									/>
									<div className={styles.checkingIconContainer}>
										{!isCheckingGForm && !checkingGFormLoading && (
											<FontAwesomeIcon
												icon={faRotateRight}
												className={styles.checkingIcon}
												onClick={handleClickCheckingGForm}
											/>
										)}
										{!isCheckingGForm && checkingGFormLoading && (
											<FontAwesomeIcon icon={faRotateRight} className={styles.checkingIcon} spin />
										)}

										{!isValidGForm && isCheckingGForm && (
											<FontAwesomeIcon icon={faXmarkCircle} className={styles.checkingErrorIcon} />
										)}
										{isValidGForm && isCheckingGForm && (
											<FontAwesomeIcon
												icon={faCheckCircle}
												className={styles.checkingSuccessIcon}
											/>
										)}
									</div>
								</div>
								<span className={styles.helpText}>
									<FontAwesomeIcon icon={faInfoCircle} className={styles.helpTextIcon} />
									Contoh link google form yang valid: https://docs.google.com/forms/d/e/xxxxxxxxx
								</span>
							</div>
						</form>
					</div>
					<div className={styles.footer}>
						<Button
							type="Secondary"
							onClick={() => {
								setForm({
									attachment_name: '',
									attachment_source: '',
								});
								onClose();
							}}>
							Batal
						</Button>
						<Button
							type={formValidation ? 'Primary' : 'Disabled'}
							onClick={() => {
								postAttachment({
									...form,
									type: 'quiz',
									status: 'draft',
								})
									.then((res) => {
										toast.success(res.data.message, {
											position: toast.POSITION.TOP_RIGHT,
										});
										dispatch(addQuiz(res.data.data.attachment));
										setIsSuccessCreateQuiz(true);
									})
									.catch((err) => {
										toast.error(err.response.data.message, {
											position: toast.POSITION.TOP_RIGHT,
										});
									});
							}}>
							Buat
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
