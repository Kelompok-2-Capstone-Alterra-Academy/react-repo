import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Chat.module.css';
import { faArrowDown, faArrowUp, faSearch, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

export default function Chat() {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState('Matematika');
	const [searchValue, setSearchValue] = useState('');
	const [data, setData] = useState([]);

	const tempData = [
		{
			id: 1,
			name: 'Jacob Jones',
			avatar: 'https://i.pravatar.cc/150?img=1',
		},
		{
			id: 2,
			name: 'Esther Howard',
			avatar: 'https://i.pravatar.cc/150?img=2',
		},
		{
			id: 3,
			name: 'Leslie Alexander',
			avatar: 'https://i.pravatar.cc/150?img=3',
		},
		{
			id: 4,
			name: 'Robert Fox',
			avatar: 'https://i.pravatar.cc/150?img=4',
		},
		{
			id: 5,
			name: 'Dianne Russell',
			avatar: 'https://i.pravatar.cc/150?img=5',
		},
		{
			id: 6,
			name: 'Dianne Russell',
			avatar: 'https://i.pravatar.cc/150?img=5',
		},
		{
			id: 7,
			name: 'Dianne Russell',
			avatar: 'https://i.pravatar.cc/150?img=5',
		},
		{
			id: 8,
			name: 'Dianne Russell',
			avatar: 'https://i.pravatar.cc/150?img=5',
		},
	];

	const subject = [
		{
			id: 1,
			name: 'Matematika',
		},
		{
			id: 2,
			name: 'Fisika',
		},
		{
			id: 3,
			name: 'Sejarah Indonesia',
		},
		{
			id: 4,
			name: 'Ekonomi',
		},
		{
			id: 5,
			name: 'Bahasa Inggris',
		},
	];

	useEffect(() => {
		const filteredData = tempData.filter((item) =>
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		);
		setData(filteredData);
	}, [searchValue]);

	return (
		<div className={styles.container}>
			<div className={styles.logoContainer}>
				<img src="/images/logo-starMyDashboard.png" className={styles.logoImage} />
			</div>
			<div className={styles.cardContainer}>
				<div className={styles.header}>
					<span className={styles.title}>Chat</span>
					<div className={styles.actionContainer}>
						<div className={styles.searchWrapper}>
							<FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
							<input
								type="text"
								className={styles.searchInput}
								placeholder="Cari Nama Siswa"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
							/>
						</div>
						<div className={styles.selectWrapper} onClick={() => setIsSelectOpen(!isSelectOpen)}>
							<span>{selectedSubject}</span>
							<FontAwesomeIcon
								icon={isSelectOpen ? faArrowUp : faArrowDown}
								className={styles.arrowIcon}
							/>
							{isSelectOpen && (
								<div className={styles.optionContainer}>
									<span className={styles.selectTitle}>Mata Pelajaran</span>
									<div className={styles.option}>
										{subject.map((item) => (
											<div
												key={item.id}
												className={styles.optionItem}
												onClick={() => {
													setSelectedSubject(item.name);
													setIsSelectOpen(false);
												}}
											>
												{item.name}
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles.content}>
					{data.length == 0 ? (
						<div className={styles.emptyList}>
							<div className={styles.item}>
								<FontAwesomeIcon icon={faFolderOpen} className={styles.avatar} />
								<span className={styles.emptyTitle}>Tidak ada siswa yang ditemukan</span>
							</div>
						</div>
					) : (
						data.map((item) => (
							<div className={styles.list} key={item.id}>
								<div className={styles.item}>
									<img src={item.avatar} alt={item.name} className={styles.avatar} />
									<span className={styles.name}>{item.name}</span>
								</div>
								<img src={'/images/icon-whatsapp.png'} className={styles.icon} />
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
