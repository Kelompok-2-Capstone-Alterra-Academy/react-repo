import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header } from '../../components';
import Controller from './Controller/Controller';
import styles from './ManageCourse.module.css';
import Sidebar from './Sidebar/Sidebar';

export default function ManageCourse() {
	const [showSidebar, setShowSidebar] = useState(true);
	const [selectedSection, setSelectedSection] = useState({});
	const [selectedContent, setSelectedContent] = useState({});

	const { id: courseId } = useParams();

	const data = useSelector((state) => state.section);

	useEffect(() => {
		if (Object.keys(selectedSection).length === 0 && data.section.length > 0) {
			setSelectedSection(data.section[0]);
		}
	}, [data]);

	return (
		<div className={styles.container}>
			<div className={styles.barContainer}>
				<FontAwesomeIcon
					icon={faBars}
					className={styles.burger}
					onClick={() => setShowSidebar(!showSidebar)}
				/>
			</div>
			<div className={styles.content}>
				<Sidebar
					show={showSidebar}
					onSelectContent={(content) => {
						setSelectedContent(content);
					}}
					onSelectSection={(section) => {
						setSelectedSection(section);
					}}
					selectedContent={{
						sectionId: selectedSection.id ?? '',
						id: selectedContent.id ?? '',
					}}
				/>
				<div className={showSidebar ? styles.main : styles.mainWithoutSidebar}>
					<Header
						breadCrumbData={{
							name: courseId,
							links: [
								{
									link: '/dashboard',
									title: 'Dashboard',
								},
								{
									link: '/',
									title: 'Kursus Saya',
								},
								{
									link: `/course/${courseId}`,
									title: courseId,
								},
							],
						}}
						profileData={{
							name: 'Admin',
							role: 'Admin',
							pic: 'https://i.pravatar.cc/150?img=68',
							email: 'testing@gmail.com',
						}}
					/>
					<Controller
						selectedSection={selectedSection}
						selectedContent={selectedContent}
						onResetSection={() => {
							setSelectedSection({});
							setSelectedContent({});
						}}
						onResetContent={() => {
							setSelectedContent({});
						}}
					/>
				</div>
			</div>
		</div>
	);
}
