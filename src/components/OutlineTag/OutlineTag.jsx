import styles from './OutlineTag.module.css';
import classNames from 'classnames/bind';

export default function OutlineTag({ type, children, className }) {
	const colorStyle = (type) => {
		switch (type) {
			case 'Green':
				return styles.green;
			case 'Blue':
				return styles.blue;
			case 'Yellow':
				return styles.yellow;
			case 'Red':
				return styles.red;
			case 'Grey':
				return styles.grey;
			default:
				return;
		}
	};

	return <div className={classNames(styles.tag, colorStyle(type), className)}>{children}</div>;
}
