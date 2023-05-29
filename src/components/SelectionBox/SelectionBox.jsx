import styles from './SelectionBox.module.css';
import classNames from 'classnames/bind';

export default function SelectionBox({ isShow, options, handleSelected, className }) {
	return (
		<div
			className={classNames(
				className,
				isShow ? classNames(styles.container, className) : classNames(styles.hideContainer)
			)}
		>
			<span className={styles.selectTitle}>{options.title}</span>
			<div className={styles.option}>
				{options.data.map((item) => (
					<div
						key={item.id}
						className={styles.optionContainer}
						onClick={() => handleSelected(item.id)}
					>
						{item.option}
					</div>
				))}
			</div>
		</div>
	);
}
