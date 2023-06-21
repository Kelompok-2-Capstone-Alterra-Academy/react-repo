import { faEye, faEyeSlash, faLock, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../clients';
import { Button } from '../../components';
import styles from './Login.module.css';

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	// const validationSchema = Yup.object().shape({
	// 	username: Yup.string()
	// 		.required('Username wajib diisi')
	// 		.matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Username harus ada huruf dan angka'),
	// 	password: Yup.string()
	// 		.required('Password Belum diisi')
	// 		.matches(
	// 			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
	// 			'Kata sandi harus ada huruf besar, huruf kecil, dan angka'
	// 		),
	// });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img src="/image/logo-starMyDashboard.png" alt="logo" />
			</div>
			<div className={styles.content} style={{ borderRadius: '16px' }}>
				<img src="/image/Mask.png" alt="/" className={styles.image} />
				<div className={styles.tampilan}>
					<div className={styles.tampilanHeader}>
						<span className={styles.title}>Selamat Datang di MyDashboard</span>
						<span className={styles.desc}>Silahkan login untuk melanjutkan</span>
					</div>
					<div className={styles.emailForm}>
						<span className={styles.label}>Email</span>
						<div className={styles.inputContainer}>
							<FontAwesomeIcon icon={faUser} className={styles.icon} />
							<input
								className={styles.input}
								name="email"
								placeholder="Email"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
					<div className={styles.passwordForm}>
						<span className={styles.label}>Kata Sandi</span>
						<div className={styles.inputContainer}>
							<FontAwesomeIcon icon={faLock} className={styles.icon} />
							<input
								className={styles.input}
								name="password"
								placeholder="Kata Sandi"
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FontAwesomeIcon
								icon={showPassword ? faEyeSlash : faEye}
								className={styles.eyeIcon}
								onClick={() => setShowPassword(!showPassword)}
							/>
						</div>
					</div>
					<Link href="/forgot-password" className={styles.forgotPassword}>
						<span>Lupa Kata Sandi?</span>
					</Link>
					<Button
						type="Primary"
						className={styles.button}
						onClick={() => {
							setLoading(true);
							login({ email, password })
								.then((res) => {
									toast.success(res.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									document.cookie = `token=${res.data.data.token}`;
									window.location.href = '/dashboard';
								})
								.catch((err) => {
									toast.error(err.response.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									setEmail('');
									setPassword('');
								})
								.finally(() => {
									setLoading(false);
								});
						}}>
						<span>{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
