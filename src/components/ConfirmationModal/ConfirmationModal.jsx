import Modal from '@mui/material/Modal';
import { Button } from '../../components';
import styles from './ConfirmationModal.module.css';

export default function ConfirmationModal({
	show,
	primaryButtonName,
	secondaryButtonName,
	onPrimaryButtonClick,
	onSecondaryButtonClick,
	title,
	image,
	confirmationText,
}) {
	return (
		<Modal open={show} onClose={onSecondaryButtonClick} style={{ padding: 0 }}>
			<div className={styles.container}>
				<span className={styles.headerTitle}>{title}</span>
				<div className={styles.content}>
					<img src={image} alt="image-title" className={styles.image} />
					<span>{confirmationText}</span>
				</div>
				<div className={styles.footer}>
					<Button type="Danger" onClick={onSecondaryButtonClick}>
						{secondaryButtonName}
					</Button>
					<Button type="Primary" onClick={onPrimaryButtonClick}>
						{primaryButtonName}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
