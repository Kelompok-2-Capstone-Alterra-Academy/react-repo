import {
	faChevronDown,
	faChevronUp,
	faFolderOpen,
	faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { toast } from 'react-toastify';
import { getClass, getStudent } from '../../clients';
import { Select } from '../../components';
import { useClickOutside } from '../../hooks';
import styles from './Chat.module.css';

export default function Chat() {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [loadingFetchClass, setLoadingFetchClass] = useState(true);
	const [loadingFetchStudent, setLoadingFetchStudent] = useState(true);

	const [selectedClass, setSelectedClass] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const [classList, setClassList] = useState([]);
	const [studentData, setStudentData] = useState([]);
	const [displayedData, setDisplayedData] = useState([]);

	const containerRef = useClickOutside(() => {
		setIsSelectOpen(false);
	});

	useEffect(() => {
		setLoadingFetchClass(true);
		getClass()
			.then((res) => {
				setClassList(res.data.data);
				setSelectedClass(res.data.data[0].ID);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchClass(false);
			});
	}, []);

	useEffect(() => {
		if (selectedClass == '') return;
		setLoadingFetchStudent(true);
		getStudent(selectedClass)
			.then((res) => {
				setStudentData(res.data.data.students);
				setDisplayedData(res.data.data.students);
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})

			.finally(() => {
				setLoadingFetchStudent(false);
			});
	}, [selectedClass]);

	useEffect(() => {
		const filteredData = studentData.filter((item) =>
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		);
		setDisplayedData(searchValue == '' ? studentData : filteredData);
	}, [searchValue]);

	if (loadingFetchClass) {
		return <LoopCircleLoading size="large" color="#4161ff" />;
	}

	return (
		<div className={styles.container}>
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
						<div
							className={styles.selectWrapper}
							onClick={() => setIsSelectOpen(isSelectOpen ? false : true)}
							ref={containerRef}>
							<span>{classList.find((item) => item.ID == selectedClass).class_name}</span>
							<FontAwesomeIcon
								icon={isSelectOpen ? faChevronUp : faChevronDown}
								className={styles.arrowIcon}
							/>
							<Select
								isShow={isSelectOpen}
								options={{
									title: 'Pilih Kelas',
									data: classList.map((item) => ({
										id: item.ID,
										option: item.class_name,
									})),
								}}
								handleSelected={(id) => {
									setSelectedClass(id);
									setSearchValue('');
								}}
							/>
						</div>
					</div>
				</div>
				<div className={styles.content}>
					{loadingFetchStudent ? (
						<LoopCircleLoading size="large" color="#4161ff" />
					) : displayedData.length == 0 ? (
						<div className={styles.emptyList}>
							<div className={styles.item}>
								<FontAwesomeIcon icon={faFolderOpen} className={styles.avatar} />
								<span className={styles.emptyTitle}>Tidak ada siswa yang ditemukan</span>
							</div>
						</div>
					) : (
						displayedData.map((item) => (
							<div className={styles.list} key={item.ID}>
								<span className={styles.name}>{item.name}</span>
								<img src={'/image/icon-whatsapp.png'} className={styles.icon} />
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
