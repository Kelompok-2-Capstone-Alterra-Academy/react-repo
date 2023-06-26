import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@material-ui/core';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../clients';
import styles from './Register.module.css';

function getSteps() {
	return ['Akun', 'Data Diri'];
}

const BasicForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordAgain, setShowPasswordAgain] = useState(false);
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext();
	const passwords = watch('password');

	useEffect(() => {
		if (errors.telpon) {
			toast.error('Nomor telepon harus 11 digit', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	}, [errors.telpon]);

	useEffect(() => {
		if (errors.ulangPassword) {
			toast.error('Kata sandi tidak cocok', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	}, [errors.ulangPassword]);

	return (
		<>
			<div className={styles.form}>
				<div className={styles.emailForm}>
					<span className={styles.label}>Email</span>
					<div className={styles.inputContainer}>
						<Controller
							control={control}
							name="email"
							render={({ field }) => (
								(<label>Email</label>),
								(
									<input
										className={styles.input}
										required
										id="email"
										placeholder="contoh@gmail.com"
										type="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										{...field}
									/>
								)
							)}
						/>
					</div>
				</div>

				<div className={styles.passwordForm}>
					<label className={styles.label}>Kata Sandi</label>
					<div className={styles.inputContainer}>
						<Controller
							control={control}
							name="password"
							render={({ field }) => (
								<input
									className={styles.input}
									required
									id="password"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Terdiri dari huruf dan angka"
									{...field}
								/>
							)}
						/>
						<FontAwesomeIcon
							position="end"
							onClick={() => setShowPassword(!showPassword)}
							icon={showPassword ? faEyeSlash : faEye}
							style={{ cursor: 'pointer' }}
						/>
					</div>
				</div>

				<div className={styles.passwordAgainForm}>
					<span className={styles.label}>Ulang Kata Sandi</span>
					<div className={styles.inputContainer}>
						<Controller
							control={control}
							name="ulangPassword"
							rules={{
								required: 'Ulang kata sandi diperlukan',
								validate: (value) => value === passwords || 'Kata sandi tidak cocok',
								minLength: {
									value: 8,
									message: 'Kata sandi minimal 8 karakter',
								},
							}}
							render={({ field }) => (
								<input
									className={styles.input}
									required
									type={showPasswordAgain ? 'text' : 'password'}
									onChange={(e) => setShowPasswordAgain(e.target.value)}
									placeholder="Masukan kata sandi yang sama"
									{...field}
								/>
							)}
						/>
						<FontAwesomeIcon
							position="end"
							onClick={() => setShowPasswordAgain(!showPasswordAgain)}
							icon={showPasswordAgain ? faEyeSlash : faEye}
							style={{ cursor: 'pointer' }}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

const DataDiri = () => {
	const [username, setUsername] = useState('');
	const [telpon, setTelpon] = useState('');
	const [namaLengkap, setNmaLengkap] = useState('');

	const { control, setValue } = useFormContext();

	return (
		<>
			<div className={styles.namaLengkapForm}>
				<label className={styles.label}>Nama Lengkap</label>
				<div className={styles.inputContainer}>
					<Controller
						control={control}
						name="namaLengkap"
						render={({ field }) => (
							<input
								className={styles.input}
								required
								id="namaLengkap"
								placeholder="Masukkan Nama Lengkap"
								value={namaLengkap}
								onChange={(e) => setNmaLengkap(e.target.value)}
								{...field}
							/>
						)}
					/>
				</div>
			</div>

			<div className={styles.usernameForm}>
				<span className={styles.label}>Username</span>
				<div className={styles.inputContainer}>
					<Controller
						control={control}
						name="username"
						render={({ field }) => (
							(<label>Username</label>),
							(
								<input
									className={styles.input}
									id="username"
									required
									label="Username"
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									{...field}
								/>
							)
						)}
					/>
				</div>
			</div>

			<div className={styles.telponForm}>
				<span className={styles.label}>No Telpon</span>
				<div className={styles.inputContainer}>
					<Controller
						control={control}
						name="telpon"
						rules={{ minLength: 11 }}
						render={({ field }) => (
							(<label>No Telpon</label>),
							(
								<input
									className={styles.input}
									required
									id="telpon"
									placeholder="08XXXXXXXXXX"
									type="number"
									value={telpon}
									onChange={(e) => setTelpon(e.target.value)}
									{...field}
								/>
							)
						)}
					/>
				</div>
			</div>
		</>
	);
};

function getStepContent(step) {
	switch (step) {
		case 0:
			return <BasicForm />;
		case 1:
			return <DataDiri />;
		default:
			return 'unknown step';
	}
}

const Register = () => {
	const methods = useForm({
		defaultValues: {
			username: '',
			email: '',
			telpon: '',
			password: '',
			namaLengkap: '',
		},
	});

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = useState(0);
	const [skippedSteps, setSkippedSteps] = useState([]);
	const [step1Valid, setStep1Valid] = useState(false);

	const steps = getSteps();

	const handleNext = (data) => {
		if (activeStep === 0) {
			methods.trigger().then((isValid) => {
				if (isValid) {
					setActiveStep(activeStep + 1);
					setSkippedSteps((prevSkippedSteps) => [...prevSkippedSteps, activeStep]);
					setStep1Valid(true); // Set status validasi step 1 menjadi true
				} else {
					setStep1Valid(false); // Set status validasi step 1 menjadi false
				}
			});
		} else if (activeStep === 1) {
			methods.trigger().then((isValid) => {
				if (isValid) {
					setLoading(true);
					onSubmit(data);
				} else {
					setActiveStep(0); // Kembali ke Step 1 jika terjadi error
				}
			});
		} else {
			setActiveStep(activeStep + 1);
			setSkippedSteps((prevSkippedSteps) => [...prevSkippedSteps, activeStep]);
		}
	};

	const onSubmit = (data) => {
		setLoading(true);
		register({
			username: data.username,
			email: data.email,
			password: data.password,
			phone_number: data.telpon,
			name: data.namaLengkap,
		})
			.then((res) => {
				document.cookie = `token=${res.data.data.token}`;
				navigate('/login');
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
				methods.reset();
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				<img src="/image/Daftar.png" alt="/" className={styles.image} />
				<span className={styles.imageText}>Temukan Kembali Akses Akun Anda dengan Mudah</span>
			</div>
			<div className={styles.tampilan}>
				<div className={styles.tampilanHeader}>
					<span className={styles.title}>
						{activeStep === steps.length - 1 ? 'Lengkapi Data Diri' : 'Buat Akun Mentor'}
					</span>
					<span className={styles.desc}>Mulai dengan membuat akun baru</span>
					<div className={styles.Steperr}>
						<Stepper alternativeLabel activeStep={activeStep}>
							{steps.map((step, index) => {
								const labelProps = {};
								const stepProps = {};
								return (
									<Step {...stepProps} key={index}>
										<StepLabel {...labelProps}>{step}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</div>
				</div>
				{activeStep === steps.length ? (
					<Typography variant="h3" align="center">
						Thank You
					</Typography>
				) : (
					<>
						<div className={styles.formContainer}>
							<FormProvider {...methods}>
								<form onSubmit={methods.handleSubmit(handleNext)} className={styles.form}>
									{getStepContent(activeStep)}
									<Button
										style={{ color: 'white', backgroundColor: '#2196F3', width: '100%' }}
										variant="contained"
										type="submit">
										<span>
											{loading ? (
												<FontAwesomeIcon icon={faSpinner} spin />
											) : activeStep === steps.length - 1 ? (
												'Tambahkan Akun'
											) : (
												'Lanjut'
											)}
										</span>
									</Button>
								</form>
							</FormProvider>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Register;
