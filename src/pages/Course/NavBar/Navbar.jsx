import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Navbar.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../../../components';

export default function NavBar() {
	return (
		<div className={styles.container}>
			<FontAwesomeIcon icon={faBars} className={styles.burger} />
			<div className={styles.logoImage}>
				<img src="/images/logo-starMyDashboard.png" />
			</div>
			<div className={styles.profile}>
				<Profile
					name="Jennie BP"
					pic={'https://i.pravatar.cc/150?img=13'}
					email="jennieblpk20@email.com"
				/>
			</div>
		</div>
	);
}
