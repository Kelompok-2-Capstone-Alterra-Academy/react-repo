import { Breadcrumb, Profile } from '../../components';
import styles from './Header.module.css';

export default function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.breadcrumb}>
				<Breadcrumb
					name={'Learning Module'}
					links={[
						{ link: '/', title: 'Home' },
						{ link: '/', title: 'Learning Module' },
						{ link: '/', title: 'Learning Module' },
					]}
				/>
			</div>
			<div className={styles.profile}>
				<Profile
					data={{
						name: 'Aldi Taher',
						pic: 'https://avatars.githubusercontent.com/u/55269572?v=4',
						email: 'look_at_the_star@gmail.com',
						role: 'Instructor',
					}}
				/>
			</div>
		</div>
	);
}
