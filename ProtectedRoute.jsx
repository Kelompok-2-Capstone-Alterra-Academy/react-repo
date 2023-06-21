import { Navigate } from 'react-router-dom';
import styles from './ProtectedRoute.module.css';
import { Sidebar } from './src/components';

export default function ProtectedRoute({ children, isUsingSidebar = true }) {
	const getCookieValue = (cookieName) => {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.startsWith(`${cookieName}=`)) {
				return cookie.substring(cookieName.length + 1) ?? '';
			}
		}
		return '';
	};

	if (!getCookieValue('token')) {
		return <Navigate to={'/login'} />;
	} else {
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
}
