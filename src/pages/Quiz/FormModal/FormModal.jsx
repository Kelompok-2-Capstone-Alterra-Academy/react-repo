import { faCheckCircle, faRotateRight, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button } from '../../../components';
import styles from './FormModal.module.css';

export default function FormModal({ onClose, onSubmit }) {
	const [form, setForm] = useState({
		name: '',
		link: '',
	});
	const [formValidation, setFormValidation] = useState(false);
	const [isCheckingGForm, setIsCheckingGForm] = useState(false);
	const [checkingGFormLoading, setCheckingGFormLoading] = useState(false);
	const [isValidGForm, setIsValidGForm] = useState(false);
	const [isSuccessCreateQuiz, setIsSuccessCreateQuiz] = useState(false);

	useEffect(() => {
		if (form.name !== '' && form.link !== '' && isValidGForm) {
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
			setIsValidGForm(checkGFormExistence(form.link));
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
					<span className={styles.headerTitle}>Membuat Kuis</span>
					<div className={styles.content}>
						<form className={styles.form}>
							<input
								className={styles.formInput}
								type="text"
								placeholder="Nama Kuis"
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
							/>
							<div className={styles.gFormInput}>
								<input
									className={styles.formInput}
									type="text"
									placeholder="Link G-Form"
									value={form.link}
									onChange={(e) => {
										setForm({ ...form, link: e.target.value });
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
										<FontAwesomeIcon icon={faCheckCircle} className={styles.checkingSuccessIcon} />
									)}
								</div>
							</div>
						</form>
					</div>
					<div className={styles.footer}>
						<Button
							type="Secondary"
							onClick={() => {
								setForm({
									name: '',
									link: '',
								});
								onClose();
							}}>
							Batal
						</Button>
						<Button
							type={formValidation ? 'Primary' : 'Disabled'}
							onClick={() => {
								onSubmit(form);
								setIsSuccessCreateQuiz(true);
							}}>
							Buat
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
