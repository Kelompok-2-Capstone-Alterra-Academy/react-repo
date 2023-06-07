import {
	faArrowDown,
	faArrowUp,
	faFolder,
	faGear,
	faMoneyBill,
	faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useClickOutside } from '../../hooks';
import { truncateString } from '../../utilities/string';
import styles from './Profile.module.css';

export default function ProfilePage({ data }) {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const menuItems = [
		{ icon: faGear, title: 'Edit Profile' },
		{ icon: faFolder, title: 'Kursus Saya' },
		{ icon: faMoneyBill, title: 'Income' },
		{ icon: faPhone, title: 'Kontak CS' },
	];
	const [isFirstRender, setIsFirstRender] = useState(true);
	const containerRef = useClickOutside(() => {
		setMenuOpen(false);
	});

	useEffect(() => {
		if (isMenuOpen) {
			setIsFirstRender(false);
		}
	}, [isMenuOpen]);

	return (
		<div
			className={styles.container}
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
			<FontAwesomeIcon icon={isMenuOpen ? faArrowUp : faArrowDown} className={styles.arrowIcon} />

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
						<div key={index} className={styles.menuItem}>
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
