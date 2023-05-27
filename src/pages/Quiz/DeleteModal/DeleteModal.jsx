import styles from './DeleteModal.module.css';
import { Button } from '../../../components';

export default function DeleteModal({ closeFunction }) {
	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Hapus Kuis?</span>
			<div className={styles.content}>
				<img src={'/image/quiz-delete.png'} alt="" className={styles.image} />
				<span>Apakah anda yakin untuk menghapus kuis?</span>
			</div>
			<div className={styles.footer}>
				<Button
					type="Danger"
					onClick={() => {
						closeFunction();
					}}
				>
					Hapus
				</Button>
				<Button
					type="Primary"
					onClick={() => {
						closeFunction();
					}}
				>
					Batal
				</Button>
			</div>
		</div>
	);
}
