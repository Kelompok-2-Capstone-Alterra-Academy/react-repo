import styles from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCirclePlus, faLink } from '@fortawesome/free-solid-svg-icons';
import { Button, Tag } from './components';

function App() {
	return (
		<div className={styles.container}>
			<div className={styles.primary}>
				<Button className={styles.button} type="Primary">
					<span>Simpan</span>
				</Button>
				<Button className={styles.button} type="Primary">
					<span>Tambahkan</span>
				</Button>
				<Button className={styles.button} type="Primary">
					<span>Berikan Quiz</span>
				</Button>
				<Button className={styles.button} type="Primary">
					<span>Tambahkan Media</span>
					<FontAwesomeIcon icon={faPlus} className={styles.iconRight} />
				</Button>
				<Button className={styles.button} type="Primary">
					<FontAwesomeIcon icon={faCirclePlus} className={styles.iconLeft} />
					<span>Tugaskan</span>
				</Button>
			</div>
			<div className={styles.secondary}>
				<Button className={styles.button} type="Secondary">
					<FontAwesomeIcon icon={faPlus} />
				</Button>
				<Button className={styles.button} type="Secondary">
					<span>Batal</span>
				</Button>
				<Button className={styles.button} type="Secondary">
					<span>Hubungi</span>
				</Button>
				<Button className={styles.button} type="Secondary">
					<FontAwesomeIcon icon={faLink} className={styles.iconLeft} />
					<span>Link</span>
				</Button>
			</div>
			<div className={styles.danger}>
				<Button className={styles.button} type="Danger">
					<FontAwesomeIcon icon={faTrash} />
				</Button>
				<Button className={styles.button} type="Danger">
					<span>Hapus Siswa</span>
				</Button>
			</div>
			<div className={styles.tagContainer}>
				<Tag className={styles.tag} type="Green">
					<span>Testing</span>
				</Tag>
				<Tag className={styles.tag} type="Blue">
					<span>Testing</span>
				</Tag>
				<Tag className={styles.tag} type="Red">
					<span>Testing</span>
				</Tag>
				<Tag className={styles.tag} type="Yellow">
					<span>Testing</span>
				</Tag>
				<Tag className={styles.tag} type="Grey">
					<span>Testing</span>
				</Tag>
			</div>
		</div>
	);
}

export default App;
