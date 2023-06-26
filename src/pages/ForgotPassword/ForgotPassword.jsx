import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../components';
import styles from './ForgotPassword.module.css';

export default function Login() {
	const initialValues = {
		username: '',
		password: '',
		remember: false,
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required('Username wajib diisi')
			.matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Username harus ada huruf dan angka'),
		password: Yup.string()
			.required('Password Belum diisi')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
				'Kata sandi harus ada huruf besar, huruf kecil, dan angka'
			),
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src="/image/logo-starMyDashboard.png" alt="logo" />
			</div>
			<div className={styles.content}>
				<div className={styles.imageContainer}>
					<img src="/image/Daftar.png" alt="/" className={styles.image} />
					<span className={styles.imageText}>Temukan Kembali Akses Akun Anda dengan Mudah</span>
				</div>
				<div className={styles.tampilan}>
					<div className={styles.tampilanHeader}>
						<span className={styles.title}>Lupa Kata Sandi?</span>
						<span className={styles.desc}>Silahkan masukkan username untuk proses selanjutnya</span>
					</div>
					<Formik initialValues={initialValues} validationSchema={validationSchema}>
						{(props) => (
							<Form className={styles.form}>
								<div className={styles.usernameForm}>
									<span className={styles.label}>Username</span>
									<div className={styles.inputContainer}>
										<FontAwesomeIcon icon={faUser} className={styles.icon} />
										<input
											className={styles.input}
											name="username"
											placeholder="Username"
											type="text"
											value={props.values.username}
											onChange={(e) => props.setFieldValue('username', e.target.value)}
										/>
									</div>
								</div>
								<Link href="/login" className={styles.forgotPassword}>
									<span>Kembali Login?</span>
								</Link>
								<Button
									type="Primary"
									className={styles.button}
									onClick={() => {
										window.open('https://wa.me/+6288888888888', '_blank');
									}}>
									Ajukan Perubahan Kata Sandi
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
