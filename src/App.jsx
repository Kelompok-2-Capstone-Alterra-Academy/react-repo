import { faLink, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './App.module.css';
import { Button, OutlineTag, Profile, Tag } from './components';

function App() {
	return (
		<div className={styles.container}>
			<div className={styles.buttonContainer}>
				<Button className={styles.button} type="Primary">
					<span>Simpan</span>
				</Button>
				<Button className={styles.button} type="Primary">
					<span>Tambahkan Media</span>
					<FontAwesomeIcon icon={faPlus} className={styles.iconRight} />
				</Button>
				<Button className={styles.button} type="Secondary">
					<FontAwesomeIcon icon={faPlus} />
				</Button>
				<Button className={styles.button} type="Secondary">
					<FontAwesomeIcon icon={faLink} className={styles.iconLeft} />
					<span>Link</span>
				</Button>
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
			<div className={styles.outlineTagContainer}>
				<OutlineTag className={styles.outlineTag} type="Green">
					<span>Testing</span>
				</OutlineTag>
				<OutlineTag className={styles.outlineTag} type="Blue">
					<span>Testing</span>
				</OutlineTag>
				<OutlineTag className={styles.outlineTag} type="Red">
					<span>Testing</span>
				</OutlineTag>
				<OutlineTag className={styles.outlineTag} type="Yellow">
					<span>Testing</span>
				</OutlineTag>
				<OutlineTag className={styles.outlineTag} type="Grey">
					<span>Testing</span>
				</OutlineTag>
			</div>
			<div className={styles.otherContainer}>
				<Profile
					data={{
						name: 'Aldi Taher',
						pic: 'https://avatars.githubusercontent.com/u/55269572?v=4',
						email: 'coldplay@gmail.com',
						role: 'Instructor',
					}}
				/>
			</div>
		</div>
	);
}

export default App;
