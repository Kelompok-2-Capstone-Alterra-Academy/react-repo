import styles from './FormModal.module.css';
import { Button } from '../../../components';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowUp,
	faArrowDown,
	faCheckCircle,
	faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { tempData } from '../constants';
// import logo from '../../../assets/quiz-created.png';

export default function FormModal({ closeFunction }) {
	const [form, setForm] = useState({
		namaKuis: '',
		kelas: '',
		mataPelajaran: '',
		jurusan: '',
		linkGForm: '',
	});
	const [formValidation, setFormValidation] = useState(false);
	const [isSelectKelas, setIsSelectKelas] = useState(false);
	const [isSelectMataPelajaran, setIsSelectMataPelajaran] = useState(false);
	const [isSelectJurusan, setIsSelectJurusan] = useState(false);
	const [isValidGForm, setIsValidGForm] = useState(false);
	const [isSuccessCreateQuiz, setIsSuccessCreateQuiz] = useState(true);

	useEffect(() => {
		if (
			form.namaKuis !== '' &&
			form.kelas !== '' &&
			form.mataPelajaran !== '' &&
			form.jurusan !== '' &&
			form.linkGForm !== '' &&
			isValidGForm
		) {
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
							}}
						>
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
							<div
								className={styles.formSelect}
								onClick={() => {
									setIsSelectKelas(!isSelectKelas);
									setIsSelectMataPelajaran(false);
									setIsSelectJurusan(false);
								}}
							>
								<span className={form.kelas === '' ? styles.placeholder : styles.selected}>
									{form.kelas === '' ? 'Kelas' : form.kelas}
								</span>
								<FontAwesomeIcon
									icon={isSelectKelas ? faArrowUp : faArrowDown}
									className={styles.arrowIcon}
								/>
								{isSelectKelas && (
									<div className={styles.optionContainer}>
										<span className={styles.selectTitle}>Kelas</span>
										<div className={styles.option}>
											{tempData.kelas.map((item) => (
												<div
													key={item.id}
													className={styles.optionItem}
													onClick={() => {
														setForm({ ...form, kelas: item.nama });
														setIsSelectKelas(false);
													}}
												>
													{item.nama}
												</div>
											))}
										</div>
									</div>
								)}
							</div>
							<div
								className={styles.formSelect}
								onClick={() => {
									setIsSelectMataPelajaran(!isSelectMataPelajaran);
									setIsSelectKelas(false);
									setIsSelectJurusan(false);
								}}
							>
								<span className={form.mataPelajaran === '' ? styles.placeholder : styles.selected}>
									{form.mataPelajaran === '' ? 'Mata Pelajaran' : form.mataPelajaran}
								</span>
								<FontAwesomeIcon
									icon={isSelectMataPelajaran ? faArrowUp : faArrowDown}
									className={styles.arrowIcon}
								/>
								{isSelectMataPelajaran && (
									<div className={styles.optionContainer}>
										<span className={styles.selectTitle}>Mata Pelajaran</span>
										<div className={styles.option}>
											{tempData.mataPelajaran.map((item) => (
												<div
													key={item.id}
													className={styles.optionItem}
													onClick={() => {
														setForm({ ...form, mataPelajaran: item.nama });
														setIsSelectMataPelajaran(false);
													}}
												>
													{item.nama}
												</div>
											))}
										</div>
									</div>
								)}
							</div>
							<div
								className={styles.formSelect}
								onClick={() => {
									setIsSelectJurusan(!isSelectJurusan);
									setIsSelectKelas(false);
									setIsSelectMataPelajaran(false);
								}}
							>
								<span className={form.jurusan === '' ? styles.placeholder : styles.selected}>
									{form.jurusan === '' ? 'Jurusan' : form.jurusan}
								</span>
								<FontAwesomeIcon
									icon={isSelectJurusan ? faArrowUp : faArrowDown}
									className={styles.arrowIcon}
								/>
								{isSelectJurusan && (
									<div className={styles.optionContainer}>
										<span className={styles.selectTitle}>Jurusan</span>
										<div className={styles.option}>
											{tempData.jurusan.map((item) => (
												<div
													key={item.id}
													className={styles.optionItem}
													onClick={() => {
														setForm({ ...form, jurusan: item.nama });
														setIsSelectJurusan(false);
													}}
												>
													{item.nama}
												</div>
											))}
										</div>
									</div>
								)}
							</div>
							<div className={styles.gFormInput}>
								<input
									className={styles.formInput}
									type="text"
									placeholder="Link G-Form"
									value={form.linkGForm}
									onChange={(e) => {
										setForm({ ...form, linkGForm: e.target.value });
										setIsValidGForm(checkGFormExistence(e.target.value));
									}}
								/>
								<div className={styles.checkingIconContainer}>
									{!isValidGForm && (
										<FontAwesomeIcon icon={faXmarkCircle} className={styles.checkingErrorIcon} />
									)}
									{isValidGForm && (
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
									namaKuis: '',
									kelas: '',
									mataPelajaran: '',
									jurusan: '',
									linkGForm: '',
								});
								setIsSelectKelas(false);
								setIsSelectMataPelajaran(false);
								setIsSelectJurusan(false);
								closeFunction();
							}}
						>
							Batal
						</Button>
						<Button type={formValidation ? 'Primary' : 'Disabled'}>Buat</Button>
					</div>
				</>
			)}
		</div>
	);
}
