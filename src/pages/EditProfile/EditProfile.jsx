import { faMars, faSpinner, faVenus, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { putUser } from '../../clients';
import { Button, Header } from '../../components';
import { setUser } from '../../redux/actions/userActions';
import { truncateString } from '../../utilities/string';
import styles from './EditProfile.module.css';

export default function EditProfile() {
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [gender, setGender] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageName, setImageName] = useState({});

	const [loadingEdit, setLoadingEdit] = useState(false);

	const currentUser = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const defaultImage =
		'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg';

	const handleSubmit = async (e) => {
		setLoadingEdit(true);
		e.preventDefault();
		putUser({
			id: currentUser.ID,
			data: {
				name: name,
				role: role,
				email: email,
				phone_number: phoneNumber,
				gender,
				profile: selectedImage,
			},
		})
			.then((res) => {
				toast.success(res.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
				dispatch(
					setUser({
						ID: currentUser.ID,
						name: name,
						role: role,
						email: email,
						phone_number: phoneNumber,
						gender: gender,
						profile: selectedImage,
					})
				);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingEdit(false);
			});
	};

	const handleImageUpload = (event) => {
		console.log('hai');
		const file = event.target.files[0];
		const reader = new FileReader();
		setImageName(file);

		reader.onload = () => {
			const base64Image = reader.result;
			setSelectedImage(base64Image);
		};

		reader.readAsDataURL(file);
	};

	useEffect(() => {
		setName(currentUser?.name);
		setRole(currentUser?.role);
		setEmail(currentUser?.email);
		setPhoneNumber(currentUser?.phone_number);
		setGender(currentUser?.gender);
		setSelectedImage(currentUser?.profile);
	}, [currentUser]);

	return (
		<>
			<Header
				breadCrumbData={{
					name: 'Edit Profile',
					links: [
						{ link: '/dashboard', title: 'Dashboard' },
						{ link: '/edit-profile', title: 'Edit Profile' },
					],
				}}
			/>
			<div className="mb-10">
				<form onSubmit={handleSubmit}>
					<div className="w-100 border rounded-2xl px-6">
						<div className="flex items-center justify-between mt-10">
							<div className="flex items-center">
								<img
									src={
										currentUser?.profile == 'noimage.png'
											? defaultImage
											: currentUser?.profile || defaultImage
									}
									alt="Profile"
									className={styles.profileImage}
								/>
								<div className="ml-3">
									<p className="font-bold text-xl">{currentUser?.name}</p>
									<p className="text-gray-800">{currentUser?.email}</p>
								</div>
							</div>
							<div className={styles.uploadContainer}>
								{imageName?.name != null && (
									<FontAwesomeIcon
										icon={faXmarkCircle}
										className={styles.deletePhotoIcon}
										onClick={() => {
											setSelectedImage(currentUser?.profile);
											setImageName({});
										}}
									/>
								)}
								<Button type="Primary" className={styles.buttonUpload}>
									<input type="file" onChange={handleImageUpload} className={styles.inputFile} />
									<span className={styles.uploadText}>
										{imageName?.name == null
											? 'Upload Foto Profil'
											: truncateString(imageName.name, 30)}
									</span>
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-8 mt-10">
							<div className={styles.formGroup}>
								<span className={styles.label}>Nama lengkap</span>
								<input
									type="text"
									className={styles.input}
									placeholder="Masukkan Nama Lengkap"
									onChange={(e) => {
										setName(e.target.value);
									}}
									value={name}
								/>
							</div>
							<div className={styles.formGroup}>
								<span className={styles.label}>Role</span>
								<input type="text" className={styles.disabledInput} disabled value={role} />
							</div>
							<div className={styles.formGroup}>
								<span className={styles.label}>Email</span>
								<input
									type="text"
									className={styles.input}
									placeholder="Masukkan Email"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									value={email}
								/>
							</div>
							<div className={styles.formGroup}>
								<span className={styles.label}>Nomor Kontak</span>
								<input
									type="text"
									className={styles.input}
									placeholder="Masukkan Nomor Kontak"
									onChange={(e) => {
										setPhoneNumber(e.target.value);
									}}
									value={phoneNumber}
								/>
							</div>
							<div className={styles.formGroup}>
								<span className={styles.label}>Gender</span>
								<div className={styles.genderGroup}>
									<div
										className={gender == 'male' ? styles.radioGroupActive : styles.radioGroup}
										onClick={() => {
											setGender('male');
										}}>
										<FontAwesomeIcon icon={faMars} className={styles.icon} />
										<span className={styles.genderText}>Laki-Laki</span>
									</div>
									<div
										className={gender == 'female' ? styles.radioGroupActive : styles.radioGroup}
										onClick={() => {
											setGender('female');
										}}>
										<FontAwesomeIcon icon={faVenus} className={styles.icon} />
										<span className={styles.genderText}>Perempuan</span>
									</div>
								</div>
							</div>
							<div className={styles.buttonGroup}>
								<Button type="Primary" onClick={handleSubmit} className={styles.button}>
									<span>
										{loadingEdit ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Simpan Perubahan'}
									</span>
								</Button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
