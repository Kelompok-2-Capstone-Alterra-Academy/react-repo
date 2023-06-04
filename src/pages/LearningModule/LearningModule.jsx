import styles from '../LearningModule/Learning.module.css';
import Grid from '@mui/material/Grid';
import { CardFile, CardFolder, HeaderDropdown, Header } from '../../components';

function LearningModule() {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.mainContent}>
				<HeaderDropdown />
				<p className={styles.paragraph}>File dan Folder</p>
				<Grid container spacing={2}>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFolder />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFolder />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFolder />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFolder />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFolder />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFolder />
					</Grid>
				</Grid>

				<p className={styles.paragraph}>File (3)</p>
				<Grid container spacing={2}>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFile />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFile />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFile />
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFile />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFile />
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
						<CardFile />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default LearningModule;
