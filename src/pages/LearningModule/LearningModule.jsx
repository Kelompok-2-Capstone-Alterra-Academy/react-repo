import { Profile } from '../../components';
import styles from '../LearningModule/Learning.module.css';
import ava from '../../../public/image/ava.jpg';
import { CardFile, CardFolder, HeaderDropdown, Header } from '../../components';

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
