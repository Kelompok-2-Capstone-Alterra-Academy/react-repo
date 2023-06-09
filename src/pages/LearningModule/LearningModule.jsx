import styles from '../LearningModule/Learning.module.css';
import Grid from '@mui/material/Grid';
import { CardFile, CardFolder, HeaderDropdown, Header } from '../../components';
import SidebarContent from "../../components/SidebarContent/SidebarContent";

function LearningModule() {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.mainContent}>
				<HeaderDropdown />
				<div className={styles.content}>
					<SidebarContent />
					<div>
						<p className={styles.paragraph}>File (6)</p>
						<Grid container spacing={3.5}>

							<Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
								<CardFile />
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
								<CardFile />
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
								<CardFile />
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
								<CardFile />
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
								<CardFile />
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
								<CardFile />
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LearningModule;
