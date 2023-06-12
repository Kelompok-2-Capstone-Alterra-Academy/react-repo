import { TextField, Link } from '@material-ui/core';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.css';
import gambar from '../../../public/image/Mask.png';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import { useNavigate } from 'react-router-dom';
import { login } from '../../clients';

export default function Login() {
	const navigate = useNavigate();
	const btnstyle = { marginTop: '20px' };
	const initialValues = {
		Username: '',
		password: '',
		remember: false,
	};

	const validationSchema = Yup.object().shape({
		Username: Yup.string()
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
		}).then((res) => {
			console.log(res);
			navigate('/dashboard');
		});
	};

	return (
		<div className="w-full h-screen">
			<div className={styles.con}>
				<h3 className={styles.start}>Star</h3>
				<h3 className={styles.My}>MyDashboard</h3>
			</div>
			<div
				className="grid grid-cols-1 md:grid-cols-2 m-auto h-[500px] shadow-lg shadow-gray-500 sm:max-w-[900px]"
				style={{ borderRadius: '16px' }}>
				<div className="w-full h-[500px]  md:block">
					<img className="w-full h-full" src={gambar} alt="/" />
				</div>
				<div className={styles.tampilan}>
					<h6 className={styles.title}>Selamat Datang di MyDashboard</h6>
					<h6 className={styles.desc}>Silahkan login untuk melanjutkan</h6>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}>
						{(props) => (
							<Form>
								<div className={styles.tes}>
									<label className={styles.username}>Username</label>
									<Field
										as={TextField}
										name="Username"
										placeholder="Username"
										fullWidth
										required
										helperText={<ErrorMessage name="Username" />}
										variant="outlined"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<AccountCircleRoundedIcon style={{ color: '#9E9E9E' }} />
												</InputAdornment>
											),
										}}
									/>
								</div>
								<label className={styles.Sandi}>Kata Sandi</label>
								<Field
									as={TextField}
									name="password"
									placeholder="Kata Sandi"
									type="password"
									fullWidth
									required
									helperText={<ErrorMessage name="password" />}
									variant="outlined"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<LockIcon style={{ color: '#9E9E9E' }} />
											</InputAdornment>
										),
									}}
								/>
								<p className={styles.Lupa}>
									<Link style={{ color: '#212121', textDecoration: 'none' }} href="/Lupa">
										Lupa Kata Sandi?
									</Link>
								</p>
								<Button
									type="submit"
									variant="contained"
									disabled={props.isSubmitting}
									style={btnstyle}
									fullWidth>
									{props.isSubmitting ? 'Loading' : 'Login'}
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
