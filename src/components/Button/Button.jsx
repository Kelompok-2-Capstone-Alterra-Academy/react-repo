import classNames from 'classnames/bind';
import styles from './Button.module.css';

export default function Button({ onClick, type, children, className }) {
	const colorStyle = (type) => {
		switch (type) {
			case 'Primary':
				return styles.primary;
			case 'Secondary':
				return styles.secondary;
			case 'Danger':
				return styles.danger;
			default:
				return;
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
