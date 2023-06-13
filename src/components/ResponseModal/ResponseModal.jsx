import { Button } from '../Button';
import { OutlinedButton } from '../OutlinedButton';
import styles from './ResponseModal.module.css';
import Modal from '@mui/material/Modal';

export default function ResponseModal({
	show,
	type,
	buttonClick,
	buttonText,
	title,
	image,
	message,
	buttonVariant
}) {
	return (
		<Modal open={show} onClose={buttonClick} style={{ padding: 0 }}>
			<div className={styles.container}>
				<span className={styles.headerTitle}>{title}</span>
				<div className={styles.content}>
					<img src={image} alt="image-title" className={styles.image} />
					<span>{message}</span>
				</div>
				<div className={styles.footer}>
					{
						buttonVariant == 'Outlined' ? (
						<OutlinedButton type={type} onClick={buttonClick}>
							{buttonText}
						</OutlinedButton>
						) : (
						<Button type={type} onClick={buttonClick}>
							{buttonText}
						</Button>
						)
					}
				</div>
			</div>
		</Modal>
	);
}
