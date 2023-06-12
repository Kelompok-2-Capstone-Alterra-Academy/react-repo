import { faChevronDown, faMars, faUpload, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Button, OutlineTag, Select } from '../../components';
import { useClickOutside } from '../../hooks';
import styles from './CardKursus.module.css';

export default function CardKursus({ data }) {
	const [isShowPublishModal, setIsShowPublishModal] = useState(false);
	const [isShowClassSelect, setIsShowClassSelect] = useState(false);
	const [isShowMajorSelect, setIsShowMajorSelect] = useState(false);
	const [isShowThumbnailSelect, setIsShowThumbnailSelect] = useState(false);
	const [validation, setValidation] = useState(false);
	const [coursePrice, setCoursePrice] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [courseClass, setCourseClass] = useState('');
	const [courseMajor, setCourseMajor] = useState('');
	const [courseThumbnail, setCourseThumbnail] = useState('apple');

	const classData = [
		{ id: 1, option: 'Kelas 10' },
		{ id: 2, option: 'Kelas 11' },
		{ id: 3, option: 'Kelas 12' },
	];

	const majorData = [
		{ id: 1, option: 'IPA' },
		{ id: 2, option: 'IPS' },
		{ id: 3, option: 'Teknik Komputer Jaringan' },
		{ id: 4, option: 'Rekayasa Perangkat Lunak' },
		{ id: 5, option: 'Multimedia' },
		{ id: 6, option: 'Akuntansi' },
		{ id: 7, option: 'Administrasi Perkantoran' },
		{ id: 8, option: 'Pemasaran' },
		{ id: 9, option: 'Perhotelan' },
		{ id: 10, option: 'Tata Boga' },
	];

	const classRef = useClickOutside(() => {
		setIsShowClassSelect(false);
	});

	const majorRef = useClickOutside(() => {
		setIsShowMajorSelect(false);
	});

	const thumbnailRef = useClickOutside(() => {
		setIsShowThumbnailSelect(false);
	});

	useEffect(() => {
		setValidation(coursePrice && courseDescription && courseClass && courseMajor);
	}, [coursePrice, courseDescription, courseClass, courseMajor]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cardNavigation}>
					<OutlineTag type={data?.status === 'Terbit' ? 'Green' : 'Yellow'}>
						{data?.status ? data?.status : 'Draf'}
					</OutlineTag>
					<FontAwesomeIcon
						icon={faUpload}
						className={styles.uploadIcon}
						onClick={() => setIsShowPublishModal(true)}
					/>
				</div>
				<div className={styles.cardHeader}>
					<img className={styles.cardHeaderImage} src={data?.image} alt="" />
					<div className={styles.cardHeaderTitle}>
						<span className={styles.cardHeaderTitleText}>
							{data?.title.length > 20 ? data?.title.slice(0, 20) + '...' : data?.title}
						</span>
						<div className={styles.cardHeaderGenderTag1}>
							<FontAwesomeIcon icon={faMars} className={styles.maleIcon} />
							<span className={styles.cardHeaderGenderTag1}>Laki Laki</span>
						</div>
						<div className={styles.genderLine}>
							<div
								className={styles.maleLine}
								style={{ width: data?.malePercentage ? `${data?.malePercentage}%` : `50%` }}></div>
							<div
								className={styles.femaleLine}
								style={{
									width: data?.femalePercentage ? `${data?.femalePercentage}%` : `50%`,
								}}></div>
						</div>
						<div className={styles.cardHeaderGenderTag2}>
							<span className={styles.cardHeaderGenderTag2}>Perempuan</span>
							<FontAwesomeIcon icon={faVenus} className={styles.femaleIcon} />
						</div>
					</div>
				</div>
				<div className={styles.cardBody}>
					<div className={styles.cardBodyItem1}>
						<span className="text-[10px] text-gray-600">Jumlah Siswa</span>
						<span className="text-[24px] font-bold">
							{data?.totalStudent ? data?.totalStudent : 0}
						</span>
					</div>
					<div className={styles.cardBodyItem2}>
						<span className="text-[10px] text-gray-600">Jumlah Section</span>
						<span className="text-[24px] font-bold">
							{data?.totalSection ? data?.totalSection : 0}
						</span>
					</div>
				</div>
				<div className={styles.cardFooter}>
					<span className="text-[10px] font-bold">{data?.liveSession}</span>
				</div>
				<div className={styles.cardBorderColor}></div>
			</div>
			<Modal open={isShowPublishModal} onClose={() => setIsShowPublishModal(false)}>
				<div className={styles.publishModalContainer}>
					<div className={styles.publishModalHeader}>
						<span className={styles.publishModalHeaderTitle}>Publish Kursus</span>
					</div>
					<div className={styles.publishForm}>
						<div className={styles.priceForm}>
							<span className={styles.publishModalLabel}>Atur Harga Kursus</span>
							<input
								type="text"
								className={styles.priceInput}
								placeholder="Rp. 0"
								onChange={(e) => {
									const rawValue = e.target.value.replace(/\D/g, '');
									setCoursePrice(rawValue);
								}}
								value={
									coursePrice ? `Rp. ${coursePrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : ''
								}
							/>
						</div>
						<div className={styles.descriptionForm}>
							<span className={styles.publishModalLabel}>Deskripsi Kursus</span>
							<textarea
								className={styles.descriptionInput}
								placeholder="Jelaskan secara ringkas tentang kursusmu"
								onChange={(e) => {
									setCourseDescription(e.target.value);
								}}
								value={courseDescription}
							/>
						</div>
						<div className={styles.categoryAndThumbnailForm}>
							<div className={styles.categoryForm}>
								<span className={styles.publishModalLabel}>Kategorisasi</span>
								<div className={styles.categorySelectContainer}>
									<div
										className={styles.classSelectContainer}
										onClick={() => {
											setIsShowClassSelect(!isShowClassSelect);
										}}
										ref={classRef}>
										<span className={courseClass ? styles.classSelected : styles.classNotSelected}>
											{courseClass ? courseClass : 'Pilih Kelas'}
										</span>
										<FontAwesomeIcon icon={faChevronDown} className={styles.arrowIcon} />
										<Select
											isShow={isShowClassSelect}
											className={styles.classSelect}
											options={{
												title: 'Kelas',
												data: [
													{ id: 1, option: 'Kelas 10' },
													{ id: 2, option: 'Kelas 11' },
													{ id: 3, option: 'Kelas 12' },
												],
											}}
											handleSelected={(id) => {
												setCourseClass(classData.find((item) => item.id === id).option);
												setIsShowClassSelect(false);
											}}
										/>
									</div>
									<div
										className={styles.majorSelectContainer}
										onClick={() => {
											setIsShowMajorSelect(!isShowMajorSelect);
										}}
										ref={majorRef}>
										<span className={courseMajor ? styles.majorSelected : styles.majorNotSelected}>
											{courseMajor ? courseMajor : 'Pilih Jurusan'}
										</span>
										<FontAwesomeIcon icon={faChevronDown} className={styles.arrowIcon} />
										<Select
											isShow={isShowMajorSelect}
											className={styles.majorSelect}
											options={{
												title: 'Jurusan',
												data: [
													{ id: 1, option: 'IPA' },
													{ id: 2, option: 'IPS' },
													{ id: 3, option: 'Teknik Komputer Jaringan' },
													{ id: 4, option: 'Rekayasa Perangkat Lunak' },
													{ id: 5, option: 'Multimedia' },
													{ id: 6, option: 'Akuntansi' },
													{ id: 7, option: 'Administrasi Perkantoran' },
													{ id: 8, option: 'Pemasaran' },
													{ id: 9, option: 'Perhotelan' },
													{ id: 10, option: 'Tata Boga' },
												],
											}}
											handleSelected={(id) => {
												setCourseMajor(majorData.find((item) => item.id === id).option);
												setIsShowMajorSelect(false);
											}}
										/>
									</div>
								</div>
							</div>
							<div className={styles.thumbnailForm}>
								<span className={styles.publishModalLabel}>Thumbnail</span>
								<div
									className={styles.thumbnailSelectContainer}
									onClick={() => {
										setIsShowThumbnailSelect(!isShowThumbnailSelect);
									}}
									ref={thumbnailRef}>
									<img
										src={`/thumbnail/${courseThumbnail}.png`}
										alt=""
										className={styles.thumbnailSelectedImage}
									/>
									<FontAwesomeIcon icon={faChevronDown} className={styles.arrowIcon} />
									{isShowThumbnailSelect && (
										<div className={styles.thumbnailSelect}>
											{[
												'apple',
												'board',
												'book',
												'calculator',
												'camera',
												'earphone',
												'folder',
												'idea',
												'lamp',
												'medal',
												'monitor',
												'notebook',
												'pencil',
												'period',
												'phone',
												'ruller',
												'search',
												'toga',
												'trophy',
												'wifi',
											].map((item, index) => (
												<img
													key={index}
													src={`/thumbnail/${item}.png`}
													alt=""
													className={styles.thumbnailSelectOption}
													onClick={() => {
														setCourseThumbnail(item);
														setIsShowThumbnailSelect(false);
													}}
												/>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
						<div className={styles.modalButtonContainer}>
							<Button
								type="Secondary"
								className={styles.modalButton}
								onClick={() => {
									setIsShowPublishModal(false);
								}}>
								Batal
							</Button>
							<Button
								type={validation ? 'Primary' : 'Disabled'}
								className={styles.modalButton}
								onClick={() => {
									setIsShowPublishModal(false);
								}}>
								Publish Kursus
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
