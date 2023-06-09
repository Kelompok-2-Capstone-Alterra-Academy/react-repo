import { CardFile, CardFolder, Header, HeaderDropdown } from '../../components';
import styles from '../LearningModule/Learning.module.css';

function LearningModule() {
	return (
		<div className={styles.container}>
			<Header
				breadCrumbData={{
					name: 'Modul',
					links: [
						{
							link: '/dashboard',
							title: 'Dashboard',
						},
						{
							link: '/',
							title: 'Pembelajaran',
						},
						{
							link: '/',
							title: 'Modul',
						},
					],
				}}
				profileData={{
					name: 'Admin',
					role: 'Admin',
					pic: 'https://i.pravatar.cc/150?img=68',
					email: 'testing@gmail.com',
				}}
			/>
			<div className={styles.mainContent}>
				<HeaderDropdown />
				<CardFolder />
				<CardFile />
			</div>
		</div>
	);
}

export default LearningModule;
