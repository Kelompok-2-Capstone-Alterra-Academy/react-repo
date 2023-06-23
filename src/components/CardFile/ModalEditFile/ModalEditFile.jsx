import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { putAttachment } from '../../../clients';
import { Button } from '../../../components';
import { updateAttachment } from '../../../redux/actions/attachmentActions';
import styles from '../ModalEditFile/ModalEditFile.module.css';

const ModalEditFile = ({ closeFunction, attachment }) => {
	const [file, setFile] = useState('');

	const [validation, setValidation] = useState(false);

	useEffect(() => {
		setFile(attachment.attachment_name);
	}, [attachment]);

	useEffect(() => {
		if (file !== '') {
			setValidation(true);
		} else {
			setValidation(false);
		}
	}, [file]);

	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Form Edit Nama Berkas</span>
			<div className={styles.content}>
				<div className={styles.formGroup}>
					<span className={styles.label}>Nama Folder</span>
					<input
						className={styles.input}
						type="text"
						placeholder="Nama Berkas"
						value={file}
						onChange={(e) => setFile(e.target.value)}
					/>
					<span className={styles.helpText}>
						<FontAwesomeIcon icon={faInfoCircle} className={styles.helpTextIcon} />
						Field ini harus diisi
					</span>
				</div>
			</div>
			<div className={styles.footer}>
				<Button
					type="Secondary"
					onClick={() => {
						setFile('');
						closeFunction();
					}}>
					Batal
				</Button>
				<Button
					type={validation ? 'Primary' : 'Disabled'}
					onClick={() =>
						putAttachment({
							id: attachment.ID,
							data: {
								ID: attachment.ID,
								attachment_name: file,
							},
						})
							.then((res) => {
								toast.success(`Successfully update ${file}`, {
									position: toast.POSITION.TOP_RIGHT,
								});
								dispatch(updateAttachment(res.data.data));
							})
							.catch((err) => {
								toast.error(err.response.data.message, {
									position: toast.POSITION.TOP_RIGHT,
								});
							})
							.finally(() => {
								closeFunction();
								setFile('');
							})
					}>
					Simpan
				</Button>
			</div>
		</div>
	);
};

export default ModalEditFile;
