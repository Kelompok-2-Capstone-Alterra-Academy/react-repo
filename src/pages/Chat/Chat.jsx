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
import { getChat, getStudent } from '../../clients';
import { Select } from '../../components';
import { useClickOutside } from '../../hooks';
import styles from './Chat.module.css';

export default function Chat() {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [loadingFetchClass, setLoadingFetchClass] = useState(true);
	const [loadingFetchStudent, setLoadingFetchStudent] = useState(true);

	const [selectedClass, setSelectedClass] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const [courseList, setCourseList] = useState([]);
	const [studentData, setStudentData] = useState([]);

	const containerRef = useClickOutside(() => {
		setIsSelectOpen(false);
	});

	useEffect(() => {
		setLoadingFetchClass(true);
		getChat()
			.then((res) => {
				setCourseList(res.data.data.courses);
				setSelectedClass(res.data.data.courses[0]?.ID);
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

	if (loadingFetchClass) {
		return <LoopCircleLoading size="large" color="#4161ff" />;
	}

	console.log('==========================================');

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
							<span>{courseList.find((item) => item.ID == selectedClass).course_name}</span>
							<FontAwesomeIcon
								icon={isSelectOpen ? faChevronUp : faChevronDown}
								className={styles.arrowIcon}
							/>
							<Select
								isShow={isSelectOpen}
								options={{
									title: 'Pilih Kelas',
									data: courseList.map((item) => ({
										id: item.ID,
										option: item.course_name,
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
					) : studentData.length == 0 ? (
						<div className={styles.emptyList}>
							<div className={styles.item}>
								<FontAwesomeIcon icon={faFolderOpen} className={styles.avatar} />
								<span className={styles.emptyTitle}>Tidak ada siswa yang ditemukan</span>
							</div>
						</div>
					) : (
						studentData
							.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
							.map((item, index) => {
								return (
									<a
										className={styles.list}
										key={index}
										href={'https://wa.me/+62' + item.phone_number.slice(1).replace(/-/g, '')}
										target="_blank"
										rel="noreferrer">
										<div className={styles.nameContainer}>
											<img
												src={
													item.profile && item.profile != 'noimage.png'
														? item.profile
														: 'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg'
												}
												className={styles.avatar}
											/>
											<span className={styles.name}>{item.name}</span>
										</div>
										<img src={'/image/icon-whatsapp.png'} className={styles.icon} />
									</a>
								);
							})
					)}
				</div>
			</div>
		</div>
	);
}
