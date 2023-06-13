import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../clients';
import { Button } from '../../components';
import styles from './ForgotPassword.module.css';

export default function Login() {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

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

	const onSubmit = (values) => {
		console.log(values);
		login({
			email: 'mentor.satu@gmail.com',
			pass: '12345678',
		})
			.then((res) => {
				console.log(res);
				const token = res.data.token;
				document.cookie = `token=${token}; path=/;`;
				navigate('/dashboard');
			})
			.catch(() => {
				// TODO handle error
			});
	};

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
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}>
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
								<Button type="Primary" className={styles.button}>
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
