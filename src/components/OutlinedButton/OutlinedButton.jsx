import styles from './OutlinedButton.module.css';
import classNames from 'classnames/bind';

export default function OutlinedButton({ onClick, type, children, className }) {
	const colorStyle = (type) => {
		switch (type) {
			case 'Primary':
				return styles.primary;
			case 'Secondary':
				return styles.secondary;
			case 'Danger':
				return styles.danger;
			case 'Success':
				return styles.success;
			default:
				return styles.primary;
		}
	};

	return (
		<button
			disabled={type == 'Disabled'}
			className={classNames(styles.button, colorStyle(type), className)}
			onClick={type == 'Disabled' ? () => {} : onClick}>
			{children}
		</button>
	);
}
