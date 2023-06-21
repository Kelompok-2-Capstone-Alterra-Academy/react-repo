import { faChevronDown, faChevronUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@material-ui/core';
import { MailOutline, Search, WhatsApp } from '@mui/icons-material';
import {
	Backdrop,
	Fade,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { BiSortAZ, BiSortZA } from 'react-icons/bi';
import { TbSortAscending2, TbSortDescending2 } from 'react-icons/tb';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { delCustomer, getCourse, getCustomerByIDCourse } from '../../clients';
import { Button, ConfirmationModal, Header, OutlineTag, Select, Tag } from '../../components';
import { useClickOutside } from '../../hooks';
import { setCourse } from '../../redux/actions/courseActions';
import { deleteCustomer, setCustomer } from '../../redux/actions/customerAction';
import styles from '../ManageCustomer/ManageCustomer.module.css';

export default function ManageCustomer() {
	const [selectedCourse, setSelectedCourse] = useState('');
	const [displayedCourse, setDisplayedCourse] = useState('');
	const [sortByName, setSortByName] = useState(0);
	const [sortByTime, setSortByTime] = useState(0);
	const [sortByStatus, setSortByStatus] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [rowCustomer, setRowCustomer] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState({});
	const [open, setOpen] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	const [loadingFetchCourse, setLoadingFetchCourse] = useState(true);
	const [loadingFetchCustomer, setLoadingFetchCustomer] = useState(true);

	const dummyImage =
		'http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg';

	const customers = useSelector((state) => state.customer.customer);
	const courseData = useSelector((state) => state.course.course);

	const dispatch = useDispatch();

	const containerRef = useClickOutside(() => {
		setIsSelectOpen(false);
	});

	useEffect(() => {
		setLoadingFetchCourse(true);
		getCourse()
			.then((res) => {
				dispatch(setCourse(res.data.data));
				if (res.data.data.length > 0) {
					setSelectedCourse(res.data.data[0].ID);
				}
				setSortByName('0');
				setSortByTime('0');
				setSortByStatus('0');
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetchCourse(false);
			});
	}, []);

	useEffect(() => {
		if (selectedCourse) {
			const displayedCourseName = courseData.find((item) => item.ID == selectedCourse).course_name;
			setDisplayedCourse(
				displayedCourseName.length > 20
					? displayedCourseName.substring(0, 20) + '...'
					: displayedCourseName
			);
			setLoadingFetchCustomer(true);
			getCustomerByIDCourse(selectedCourse)
				.then((res) => {
					dispatch(setCustomer(res.data.data));
					setRowCustomer(res.data.data);
					console.log(res, selectedCourse);
				})
				.catch((err) => {
					toast.error(err.response.data.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
				})
				.finally(() => {
					setLoadingFetchCustomer(false);
				});
		}
	}, [selectedCourse]);

	const handleChangeSortName = (sortBy) => {
		setSortByName(sortBy);
	};

	const handleChangeSortTime = (event) => {
		setSortByTime(event.target.value);
	};

	const handleChangeSortActive = (event) => {
		setSortByStatus(event.target.value);
	};

	const handleSort = () => {
		const sortedCustomers = [...customers];

		const activeCustomers = sortedCustomers.filter((customer) => customer.status === 'active');
		const inactiveCustomers = sortedCustomers.filter((customer) => customer.status !== 'active');

		// Sort active customers
		activeCustomers.sort((a, b) => {
			// Sort by name
			if (sortByName == 1) {
				return b.name.localeCompare(a.name);
			} else if (sortByName == 0) {
				return a.name.localeCompare(b.name);
			}

			// Sort by time
			if (sortByTime == 1) {
				return new Date(b.CreatedAt) - new Date(a.CreatedAt);
			} else if (sortByTime == 0) {
				return new Date(a.CreatedAt) - new Date(b.CreatedAt);
			}

			return 0;
		});

		// Sort inactive customers
		inactiveCustomers.sort((a, b) => {
			// Sort by name
			if (sortByName == 1) {
				return b.name.localeCompare(a.name);
			} else if (sortByName == 0) {
				return a.name.localeCompare(b.name);
			}

			// Sort by time
			if (sortByTime == 1) {
				return new Date(b.CreatedAt) - new Date(a.CreatedAt);
			} else if (sortByTime == 0) {
				return new Date(a.CreatedAt) - new Date(b.CreatedAt);
			}

			return 0;
		});

		// Combine active and inactive customers
		let combinedCustomers = [];
		if (sortByStatus == 1) {
			combinedCustomers = [...inactiveCustomers, ...activeCustomers];
		} else {
			combinedCustomers = [...activeCustomers, ...inactiveCustomers];
		}

		setRowCustomer(combinedCustomers);
		setCustomer(combinedCustomers);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		handleSort();
	};

	const handleOpenDeleteModal = (customer) => {
		setSelectedCustomer(customer);
		setShowDeleteModal(true);
	};
	const handleCloseDeleteModal = () => setShowDeleteModal(false);

	const handleDeleteCustomer = () => {
		delCustomer({ customer: selectedCustomer, course: selectedCourse })
			.then((res) => {
				toast.success(res.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
				dispatch(deleteCustomer(selectedCustomer));
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setSelectedCustomer({});
				handleCloseDeleteModal();
			});
	};

	const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
		'& .MuiToggleButtonGroup-grouped': {
			margin: theme.spacing(2),
			border: 0,
			borderRadius: '21px',
			'&.Mui-disabled': {
				border: 0,
				borderRadius: '21px',
			},
			'&:not(:first-of-type)': {
				borderRadius: '21px',
			},
			'&:first-of-type': {
				borderRadius: '21px',
			},
		},
	}));

	const StyledToggleButton = styled(ToggleButton)(() => ({
		'&.MuiToggleButton-root': {
			outline: '1px solid gray',
			borderRadius: '15px',
			minWidth: '150px',
			textTransform: 'capitalize',
		},
		'&.Mui-selected, &.Mui-selected:hover': {
			borderColor: '#2196F3',
			backgroundColor: '#F0FAFF',
			outline: '1px solid #2196F3',
		},
		'&.Mui-selected svg ': {
			color: '#2196F3',
		},
	}));

	function handleSearchQueryChange(event) {
		const searchQuery = event.target.value;
		setSearchQuery(searchQuery);

		if (searchQuery.length === 0) {
			setRowCustomer(customers);
			handleSort();
			return;
		}

		const filteredCustomers = customers.filter((customer) =>
			customer.name.toLowerCase().includes(searchQuery.toLowerCase())
		);

		setRowCustomer(filteredCustomers);
	}

	if (loadingFetchCourse || !selectedCourse) {
		return <LoopCircleLoading size="large" color="#4161ff" />;
	}

	return (
		<div className={styles.container}>
			<Header
				breadCrumbData={{
					name: 'Customer Saya',
					links: [
						{ link: '/dashboard', title: 'Dashboard' },
						{ link: '/manage-customer', title: 'Manage Customer' },
					],
				}}
			/>
			<div className={styles.headerContainer}>
				<div className={styles.totalWrapper}>
					<span className={styles.totalTitle}>{rowCustomer.length} Total Siswa</span>
				</div>
				<div className={styles.filterWrapper}>
					<div
						className={styles.selectWrapper}
						onClick={() => setIsSelectOpen(!isSelectOpen)}
						ref={containerRef}>
						<span>{displayedCourse}</span>
						<FontAwesomeIcon
							icon={isSelectOpen ? faChevronUp : faChevronDown}
							className={styles.arrowIcon}
						/>
						<Select
							className={styles.select}
							isShow={isSelectOpen}
							options={{
								title: 'Pilih Course',
								data: courseData.map((course) => ({
									id: course.ID,
									option: course.course_name,
								})),
							}}
							handleSelected={(id) => {
								setSelectedCourse(id);
							}}
						/>
					</div>
					<div className={styles.filterIconWrapper} onClick={handleOpen}>
						<FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
					</div>
					<div className="relative flex items-center">
						<Search sx={{ position: 'absolute', left: '12px', color: 'gray' }} />
						<input
							type="text"
							className="w-72 rounded bg-gray-100 pl-11 pr-2 py-2.5 text-sm"
							placeholder="Cari nama siswa"
							value={searchQuery}
							onChange={handleSearchQueryChange}
						/>
					</div>
				</div>
			</div>
			<div className={styles.contentContainer}>
				{loadingFetchCustomer ? (
					<LoopCircleLoading size="large" color="#4161ff" />
				) : (
					<TableContainer>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Nama Siswa</TableCell>
									<TableCell>Kontak</TableCell>
									<TableCell>Tanggal Masuk</TableCell>
									<TableCell>Section </TableCell>
									<TableCell>Progress</TableCell>
									<TableCell>Tindakan</TableCell>
								</TableRow>
							</TableHead>
							<TableBody className={styles.tableBody}>
								{rowCustomer.map((row, i) => (
									<TableRow
										key={row.name + i}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component="th" scope="row">
											<div className="flex items-center space-x-3">
												<img
													src={row.profile ? row.profile : dummyImage}
													alt=""
													className="rounded-full w-16"
												/>
												<div>
													<Typography fontWeight={600}>{row.name}</Typography>
													<div className="flex items-center space-x-3 mt-1">
														<Typography fontSize={14}>{row.class ? row.class : '-'}</Typography>
														<Tag type={row.status === 'active' ? 'Green' : 'Red'}>
															{row.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
														</Tag>
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-3 mb-2.5">
												<MailOutline sx={{ fontSize: '12pt', color: '#616161' }} />
												<Typography fontSize={14} fontWeight={500}>
													{row.email}
												</Typography>
											</div>
											<div className="flex items-center space-x-3">
												<WhatsApp sx={{ fontSize: '12pt', color: '#616161' }} />
												<Typography fontSize={14} fontWeight={500}>
													{row.phone_number}
												</Typography>
											</div>
										</TableCell>
										<TableCell>
											{row.CreatedAt
												? new Date(row.CreatedAt).toLocaleDateString(undefined, {
														year: 'numeric',
														month: 'long',
														day: 'numeric',
												  })
												: '-'}
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-5">
												<Typography>{row.sectionProgress ? row.sectionProgress : '-'}</Typography>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-5">
												<OutlineTag type={row.sectionProgress === 12 ? 'Green' : 'Yellow'}>
													{row.sectionProgress === 12 ? 'Lulus Kursus' : ' - '}
												</OutlineTag>
											</div>
										</TableCell>
										<TableCell>
											<div className={styles.buttonContainer}>
												<Button type="Primary" className={styles.button}>
													<a
														href={'https://wa.me/+62' + row.phone_number.slice(1).replace(/-/g, '')}
														target="_blank"
														rel="noreferrer"
														className={styles.aLink}>
														Hubungi
													</a>
												</Button>
												<Button
													type="Danger"
													onClick={() => handleOpenDeleteModal(row.ID)}
													className={styles.button}>
													Hapus Siswa
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</div>
			<ConfirmationModal
				show={showDeleteModal}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={handleDeleteCustomer}
				onSecondaryButtonClick={handleCloseDeleteModal}
				title="Hapus Siswa?"
				image={'/image/customer-delete.png'}
				confirmationText="Apakah Anda yakin untuk menghapus siswa?"
			/>{' '}
			<Modal
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}>
				<Fade in={open}>
					<Box className="absolute right-1/2 top-1/3 translate-x-1/2 bg-white rounded-lg p-7">
						<Typography
							id="transition-modal-title"
							variant="h5"
							component="h2"
							textAlign={'center'}
							fontWeight={600}
							mb={'36px'}>
							Sortir Berdasarkan
						</Typography>
						<div>
							<StyledToggleButtonGroup
								value={sortByName}
								variant="outlined"
								onChange={(e) => handleChangeSortName(e.target.value)}
								className="flex space-x-10">
								<StyledToggleButton value="0" aria-label="bold">
									<BiSortAZ fontSize={20} className="mr-3" /> A-Z
								</StyledToggleButton>
								<StyledToggleButton value="1" aria-label="italic">
									<BiSortZA fontSize={20} className="mr-3" /> Z-A
								</StyledToggleButton>
							</StyledToggleButtonGroup>
						</div>

						<div>
							<StyledToggleButtonGroup
								value={sortByTime}
								variant="outlined"
								onChange={handleChangeSortTime}
								className="space-x-10">
								<StyledToggleButton value="0" aria-label="bold" className="w-52">
									<BiSortAZ fontSize={20} className="mr-3" /> Terbaru
								</StyledToggleButton>
								<StyledToggleButton value="1" aria-label="italic" className="w-52">
									<BiSortZA fontSize={20} className="mr-3" /> Terlama
								</StyledToggleButton>
							</StyledToggleButtonGroup>
						</div>

						<div>
							<StyledToggleButtonGroup
								value={sortByStatus}
								variant="outlined"
								onChange={handleChangeSortActive}
								className="space-x-10">
								<StyledToggleButton value="0" aria-label="bold" className="w-56">
									<TbSortAscending2 fontSize={20} className="mr-3" /> Siswa Aktif
								</StyledToggleButton>
								<StyledToggleButton value="1" aria-label="italic" className="w-56">
									<TbSortDescending2 fontSize={20} className="mr-3" /> Siswa Nonaktif
								</StyledToggleButton>
							</StyledToggleButtonGroup>
						</div>
						<Button
							sx={{
								width: '100%',
								borderRadius: '8px',
								fontWeight: 600,
								bgcolor: '#2196F3',
								mt: '10px',
								textTransform: 'capitalize',
								boxShadow: 'none',
							}}
							variant={'contained'}
							onClick={handleClose}>
							Simpan Pengaturan
						</Button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
