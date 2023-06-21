import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { postFolder } from '../../../clients';
import { Button } from '../../../components';
import { addFolder } from '../../../redux/actions/folderActions';
import styles from '../ModalFolder/ModalFolder.module.css';

const ModalFolder = ({ closeFunction }) => {
	const [folder, setFolder] = useState('');
	const dispatch = useDispatch();
	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Folder Baru</span>
			<div className={styles.content}>
				<input
					required
					className={styles.formInput}
					type="text"
					placeholder="Nama Folder Baru"
					value={folder}
					onChange={(e) => setFolder(e.target.value)}
				/>
			</div>
			<div className={styles.footer}>
				<Button
					type="Danger"
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
					type="Primary">
					Simpan
				</Button>
			</div>
		</div>
	);
};

export default ModalFolder;
