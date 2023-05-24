import styles from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faLink } from '@fortawesome/free-solid-svg-icons';
import { Button, Tag, OutlineTag, Profile } from './components';
import BasicBreadcrumbs from './components/Breadcrumbs';

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
				<Profile name="Jennie BP" pic="src/assets/ava.jpg" email="jennieblpk20@email.com" />
			</div>
			<BasicBreadcrumbs name="Modul" link1="Dashboard" link2="Pembelajaran" />
		</div>
	);
}

export default App;
