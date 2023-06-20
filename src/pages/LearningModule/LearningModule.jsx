import styles from '../LearningModule/Learning.module.css';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import { LoopCircleLoading } from 'react-loadingg';
import { CardFile, HeaderDropdown, Header } from '../../components';
import SidebarContent from "../../components/SidebarContent/SidebarContent";
import { getFolder, getAttachment } from '../../clients';
import { setFolder } from '../../redux/actions/folderActions';
import { setAttachment } from '../../redux/actions/attachmentActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function LearningModule() {
	const [loadingFetch, setLoadingFetch] = useState(false);
	const folderData = useSelector((state) => state.folder).folder;
	const attachmentData = useSelector((state) => state.attachment).attachment;
	const { id } = useParams();

	const dispatch = useDispatch();
	useEffect(() => {
		setLoadingFetch(true);
		getFolder()
			.then((res) => {
				dispatch(setFolder(res.data.data));
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_RIGHT,
				});
			})
			.finally(() => {
				setLoadingFetch(false);
			});

		getAttachment(id)
			.then((res) => {
				dispatch(setAttachment(res.data.data));
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

	if (loadingFetch) {
		return <LoopCircleLoading size="large" color="#4161ff" />;
	}

	return (
		<div className={styles.container}>
			<Header
				breadCrumbData={{
					name: 'Modul',
					links: [
						{ link: '/dashboard', title: 'Dashboard' },
						{ link: '/', title: 'Pembelajaran' },
						{ link: '/', title: 'Modul' },
					],
				}}
				profileData={{
					name: 'Admin',
					role: 'Admin',
					pic: 'https://i.pravatar.cc/150?img=21',
					email: 'testing@gmail.com',
				}}
			/>
			<div className={styles.mainContent}>
				<HeaderDropdown folderData={folderData} />
				<div className={styles.content}>
					<SidebarContent folderData={folderData} />
					<div className={styles.contentCard}>
						<p className={styles.paragraph}>File ({attachmentData.length})</p>
						<Grid container spacing={2}>
							{attachmentData.map((attachment) => (
								<Grid key={attachment.id} item xs={12} sm={6} md={4} lg={4} xl={2.4}>
									<CardFile attachment={attachment} />
								</Grid>
							))}
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LearningModule;