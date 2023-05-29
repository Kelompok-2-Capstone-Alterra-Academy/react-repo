import styles from './Select.module.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

export default function Select({ isShow, options, handleSelected, className }) {
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		if (isShow) {
			setIsFirstRender(false);
		}
	}, [isShow]);

	return (
		<div
			className={classNames(
				className,
				isShow
					? classNames(styles.container)
					: classNames(isFirstRender ? styles.firstRender : styles.hideContainer)
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
