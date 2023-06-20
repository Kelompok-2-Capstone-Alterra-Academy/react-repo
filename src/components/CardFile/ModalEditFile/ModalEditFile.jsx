import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { putAttachment } from '../../../clients';
import { Button } from '../../../components';
import { updateAttachment } from '../../../redux/actions/attachmentActions';
import styles from '../ModalEditFile/ModalEditFile.module.css';

const ModalEditFile = ({ closeFunction, attachment }) => {
	const [file, setFile] = useState('');

	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Ubah Nama Berkas</span>
			<div className={styles.content}>
				<form className={styles.form}>
					<input
						className={styles.formInput}
						type="text"
						placeholder="Nama Berkas"
						value={file}
						onChange={(e) => setFile(e.target.value)}
					/>
				</form>
			</div>
			<div className={styles.footer}>
				<Button
					type="Danger"
					onClick={() => {
						setFile('');
						closeFunction();
					}}>
					Batal
				</Button>
				<Button
					type="Primary"
					onClick={() =>
						putAttachment({
							id: attachment.ID,
							data: {
								ID: attachment.ID,
								attachment_name: file,
							},
						})
							.then((res) => {
								toast.success(res.data.message, {
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
