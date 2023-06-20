import { useEffect, useState } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAttachment, getFolder } from '../../clients';
import { CardFile, Header, HeaderDropdown } from '../../components';
import SidebarContent from '../../components/SidebarContent/SidebarContent';
import { setAttachment } from '../../redux/actions/attachmentActions';
import { setFolder } from '../../redux/actions/folderActions';
import styles from './LearningModule.module.css';

function LearningModule() {
	const [loadingFetch, setLoadingFetch] = useState(false);

	const [selectedId, setSelectedId] = useState(null);

	const folderData = useSelector((state) => state.folder.folder);
	const attachmentData = useSelector((state) => state.attachment.attachment);

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

		if (selectedId) {
			getAttachment(selectedId)
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
		}
	}, [selectedId]);

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
					<div className={styles.sidebar}>
						<SidebarContent
							folderData={folderData}
							onClickFolder={(id) => {
								setSelectedId(id);
							}}
							selectedId={selectedId}
						/>
					</div>
					<div className={styles.contentCard}>
						{loadingFetch ? (
							<LoopCircleLoading size="large" color="#4161ff" />
						) : (
							selectedId && (
								<>
									<span className={styles.paragraph}>File ({attachmentData.length})</span>
									<div className={styles.fileCardContainer}>
										{attachmentData.map((attachment) => {
											return <CardFile attachment={attachment} key={attachment.ID} />;
										})}
									</div>
								</>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default LearningModule;
