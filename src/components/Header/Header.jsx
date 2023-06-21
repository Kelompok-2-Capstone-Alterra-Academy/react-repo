import { Breadcrumb, Profile } from '../../components';
import styles from './Header.module.css';

export default function Header({ breadCrumbData }) {
	return (
		<div className={styles.header}>
			<div className={styles.breadcrumb}>
				<Breadcrumb name={breadCrumbData.name} links={breadCrumbData.links} />
			</div>
			<div className={styles.profile}>
				<Profile />
			</div>
		</div>
	);
}
