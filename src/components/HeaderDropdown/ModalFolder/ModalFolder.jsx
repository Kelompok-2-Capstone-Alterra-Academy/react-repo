import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { postFolder } from '../../../clients';
import { Button } from '../../../components';
import { addFolder } from '../../../redux/actions/folderActions';
import styles from '../ModalFolder/ModalFolder.module.css';

const ModalFolder = ({ closeFunction, folderList }) => {
	const [folder, setFolder] = useState('');
	const [validation, setValidation] = useState(false);

	useEffect(() => {
		if (
			folder !== '' &&
			!folderList.find((item) => item.folder_name.toLowerCase() === folder.toLowerCase())
		) {
			setValidation(true);
		} else {
			setValidation(false);
		}
	}, [folder]);

	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Form Tambah Folder</span>
			<div className={styles.content}>
				<div className={styles.formGroup}>
					<span className={styles.label}>Nama Folder</span>
					<input
						required
						className={styles.input}
						type="text"
						placeholder="Masukkan Nama Folder"
						value={folder}
						onChange={(e) => setFolder(e.target.value)}
					/>
					<span className={styles.helpText}>
						<FontAwesomeIcon icon={faInfoCircle} className={styles.helpTextIcon} />
						Field ini harus diisi
					</span>
					<span className={styles.helpText}>
						<FontAwesomeIcon icon={faInfoCircle} className={styles.helpTextIcon} />
						Nama folder tidak boleh sama
					</span>
				</div>
			</div>
			<div className={styles.footer}>
				<Button
					type="Secondary"
					onClick={() => {
						setFolder('');
						closeFunction();
					}}>
					Batal
				</Button>
				<Button
					onClick={() => {
						if (folder === '') {
							toast.error('Field Folder Tidak Boleh Kosong', {
								position: toast.POSITION.TOP_RIGHT,
							});
						} else {
							postFolder({
								folder_name: folder,
							})
								.then((res) => {
									toast.success(res.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									dispatch(addFolder(res.data.data.folder));
								})
								.catch((err) => {
									toast.error(err?.response?.data?.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
								})
								.finally(() => {
									setFolder('');
									closeFunction();
								});
						}
					}}
					type={validation ? 'Primary' : 'Disabled'}>
					Simpan
				</Button>
			</div>
		</div>
	);
};

export default ModalFolder;
