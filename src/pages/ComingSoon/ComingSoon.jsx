import { faHomeUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import styles from './ComingSoon.module.css';

export default function ComingSoon() {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<img src="/image/landing-featureTime1.png" alt="Coming Soon" className={styles.image} />
			<span className={styles.title}>Maaf. Fitur ini belum tersedia :(</span>
			<Button
				type="Primary"
				onClick={() => {
					navigate('/dashboard');
				}}>
				<span className={styles.button}>
					<FontAwesomeIcon icon={faHomeUser} className={styles.icon} />
					Kembali ke Dashboard
				</span>
			</Button>
		</div>
	);
}
