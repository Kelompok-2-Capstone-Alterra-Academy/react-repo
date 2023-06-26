import {
	faChevronDown,
	faChevronUp,
	faGear,
	faMoneyBill,
	faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import jwt from 'jwt-decode';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser, logout } from '../../clients';
import { useClickOutside } from '../../hooks';
import { setUser } from '../../redux/actions/userActions';
import { truncateString } from '../../utilities/string';
import styles from './Profile.module.css';

export default function Profile({ className }) {
	const data = useSelector((state) => state.user);

	const [loadingFetch, setLoadingFetch] = useState(true);

	const cookieToken = document.cookie.split('=')[1];
	const decodeToken = jwt(cookieToken);

	const dispatch = useDispatch();

	const defaultImage =
		'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg';

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

	useEffect(() => {
		setLoadingFetch(true);
		getUser(decodeToken.id)
			.then((res) => {
				dispatch(setUser(res.data.data));
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetch(false);
			});
	}, []);

	return (
		<div
			className={classNames(styles.container, className)}
			ref={containerRef}
			onClick={() => {
				setMenuOpen(!isMenuOpen);
			}}>
			{loadingFetch ? (
				<LoopCircleLoading size="small" color="#2196f3" />
			) : (
				<>
					<div className={styles.profileContainer}>
						<img
							src={data.profile == 'noimage.png' ? defaultImage : data.profile || defaultImage}
							alt="Avatar"
							className={styles.avatar}
						/>
						<div className={styles.nameContainer}>
							<span className={styles.name}>{truncateString(data.name, 20)}</span>
							<span className={styles.role}>{data.role}</span>
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
							<img
								src={data.profile == 'noimage.png' ? defaultImage : data.profile || defaultImage}
								alt="Avatar"
								className={styles.avatar}
							/>
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
										index == 2
											? window.open('https://wa.me/+6288888888888', '_blank')
											: navigate(item.link);
									}}>
									<div>
										<FontAwesomeIcon icon={item.icon} className={styles.menuIcon} />
										<span className={styles.menuTitle}>{item.title}</span>
									</div>
								</div>
							))}
						</div>
						<div
							className={styles.logoutContainer}
							onClick={() => {
								logout()
									.then((res) => {
										toast.success(res.data.message, {
											position: toast.POSITION.TOP_RIGHT,
										});
										document.cookie = 'token=;';
										navigate('/login');
									})
									.catch((err) => {
										toast.error(err.response.data.message, {
											position: toast.POSITION.TOP_RIGHT,
										});
									});
							}}>
							<div>
								<span className={styles.logoutTitle}>Logout</span>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
