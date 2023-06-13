import {
	faChevronDown,
	faChevronUp,
	faGear,
	faMoneyBill,
	faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../hooks';
import { truncateString } from '../../utilities/string';
import styles from './Profile.module.css';

export default function Profile({ data, className }) {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const menuItems = [
		{ icon: faGear, title: 'Edit Profile', link: '/edit-profile' },
		{ icon: faMoneyBill, title: 'Income', link: '/income' },
		{ icon: faPhone, title: 'Kontak CS', link: '/chat' },
	];
	const [isFirstRender, setIsFirstRender] = useState(true);
	const containerRef = useClickOutside(() => {
		setMenuOpen(false);
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (isMenuOpen) {
			setIsFirstRender(false);
		}
	}, [isMenuOpen]);

	return (
		<div
			className={classNames(styles.container, className)}
			ref={containerRef}
			onClick={() => {
				setMenuOpen(!isMenuOpen);
			}}>
			<div className={styles.profileContainer}>
				<img src={data.pic} alt="Avatar" className={styles.avatar} />
				<div className={styles.nameContainer}>
					<span className={styles.name}>{truncateString(data.name, 10)}</span>
					<span className={styles.role}>Instructors</span>
				</div>
			</div>
			<FontAwesomeIcon
				icon={isMenuOpen ? faChevronUp : faChevronDown}
				className={styles.arrowIcon}
			/>

			<div
				className={
					isMenuOpen
						? styles.menuContainer
						: isFirstRender
						? styles.firstRender
						: styles.closedMenuContainer
				}>
				<div className={styles.profileContainer}>
					<img src={data.pic} alt="Avatar" className={styles.avatar} />
					<div className={styles.nameContainer}>
						<span className={styles.name}>{data.name}</span>
						<span className={styles.email}>{data.email}</span>
					</div>
				</div>
				<div className={styles.menuItemContainer}>
					{menuItems.map((item, index) => (
						<div
							key={index}
							className={styles.menuItem}
							onClick={() => {
								navigate(item.link);
							}}>
							<div>
								<FontAwesomeIcon icon={item.icon} className={styles.menuIcon} />
								<span className={styles.menuTitle}>{item.title}</span>
							</div>
						</div>
					))}
				</div>
				<div className={styles.logoutContainer}>
					<div>
						<span className={styles.logoutTitle}>Logout</span>
					</div>
				</div>
			</div>
		</div>
	);
}
