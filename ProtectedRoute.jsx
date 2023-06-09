import styles from './ProtectedRoute.module.css';
import { Sidebar } from './src/components';

export default function ProtectedRoute({ children, isUsingSidebar = true }) {
	if (isUsingSidebar) {
		return (
			<div className={styles.container}>
				<Sidebar />
				<div className={styles.mainContent}>{children}</div>
			</div>
		);
	}

	return <div>{children}</div>;
}
