import { faCheckCircle, faRotateRight, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button } from '../../../components';
import styles from './FormModal.module.css';

export default function FormModal({ closeFunction }) {
	const [form, setForm] = useState({
		namaKuis: '',
		linkGForm: '',
	});
	const [formValidation, setFormValidation] = useState(false);
	const [isCheckingGForm, setIsCheckingGForm] = useState(false);
	const [checkingGFormLoading, setCheckingGFormLoading] = useState(false);
	const [isValidGForm, setIsValidGForm] = useState(false);
	const [isSuccessCreateQuiz, setIsSuccessCreateQuiz] = useState(false);

	useEffect(() => {
		if (form.namaKuis !== '' && form.linkGForm !== '' && isValidGForm) {
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
			setIsValidGForm(checkGFormExistence(form.linkGForm));
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
								closeFunction();
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
								value={form.namaKuis}
								onChange={(e) => setForm({ ...form, namaKuis: e.target.value })}
							/>
							<div className={styles.gFormInput}>
								<input
									className={styles.formInput}
									type="text"
									placeholder="Link G-Form"
									value={form.linkGForm}
									onChange={(e) => {
										setForm({ ...form, linkGForm: e.target.value });
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
							type="Danger"
							onClick={() => {
								setForm({
									namaKuis: '',
									linkGForm: '',
								});
								closeFunction();
							}}>
							Batal
						</Button>
						<Button type={formValidation ? 'Primary' : 'Disabled'}>Buat</Button>
					</div>
				</>
			)}
		</div>
	);
}
