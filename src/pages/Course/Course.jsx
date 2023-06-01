import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../../components';
import styles from './Course.module.css';
import Section from './Section/Section';
import Sidebar from './Sidebar/Sidebar';

export default function Course() {
	const [showSidebar, setShowSidebar] = useState(true);
	const [selectedSection, setSelectedSection] = useState({});
	const [selectedContent, setSelectedContent] = useState({});

	const data = useSelector((state) => state.section);
	console.log(data);

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
					<Header />
					{Object.keys(selectedSection).length !== 0 && (
						<Section
							section={selectedSection}
							content={selectedContent}
							onReset={() => {
								setSelectedSection({});
								setSelectedContent({});
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
