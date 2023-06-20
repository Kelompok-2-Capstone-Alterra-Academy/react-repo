import { useState } from 'react';
import styles from '../ModalLink/ModalLink.module.css';
import { Button } from '../../../components';

const ModalLink = ({ closeFunction }) => {
	const [link, setLink] = useState('');
	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Masukan Link Video</span>
			<div className={styles.content}>
				<form className={styles.form}>
					<input
						className={styles.formInput}
						type="text"
						placeholder="Link Video"
						value={link}
						onChange={(e) => setLink(e.target.value)}
					/>
				</form>
			</div>
			<div className={styles.footer}>
				<Button
					type="Danger"
					onClick={() => {
						setLink('');
						closeFunction();
					}}>
					Batal
				</Button>
				<Button type="Primary">Simpan</Button>
			</div>
		</div>
	);
};

export default ModalLink;
