import { CardFile, CardFolder, Header, HeaderDropdown } from '../../components';
import styles from '../LearningModule/Learning.module.css';

function LearningModule() {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.mainContent}>
				<HeaderDropdown />
				<CardFolder />
				<CardFile />
			</div>
		</div>
	);
}

export default LearningModule;
