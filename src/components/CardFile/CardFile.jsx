import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgVideo from '../../../public/image/icon-videoPlayer.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faDownload, faPen, faTrash, faTv } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationModal } from '../ConfirmationModal';
import Modal from '@mui/material/Modal';
import ModalDetail from './ModalDetail/ModalDetail';
import ModalEditFile from './ModalEditFile/ModalEditFile';

const CardFile = ({ attachment }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showFormModalBerkas, setShowFormModalBerkas] = useState(false);
	const [showFormModalDetail, setShowFormModalDetail] = useState(false);
	const [open, setOpen] = useState(false)

	const handleClose = (reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<>
			<Card
				elevation={0}
				sx={{
					maxWidth: 200,
					height: '100%',
					borderRadius: 2.5,
					marginBottom: '10px',
					border: '2px solid #f5f5f5',
				}}>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<PopupState variant="popover" popupId="demo-popup-menu">
						{(popupState) => (
							<>
								<MoreHorizIcon
									variant="contained"
									{...bindTrigger(popupState)}
									style={{ paddingRight: 20, color: '#E0E0E0', fontSize: 50 }}
								/>
								<Menu
									PaperProps={{
										style: {
											transform: 'translateX(-83%) translateY(-6%)',
										},
										elevation: 0,
										sx: {
											bgcolor: '#F0FAFF',
											overflow: 'visible',
											ml: '0px',
											borderRadius: '8px',
											'&:before': {
												content: '""',
												display: 'block',
												position: 'absolute',
												top: 0,
												right: 14,
												width: 10,
												height: 10,
												bgcolor: '#F0FAFF',
												transform: 'translateY(-50%) rotate(45deg)',
												zIndex: 0,
											},
										},
									}}
									{...bindMenu(popupState)}>
									<MenuItem
										style={{ marginTop: 12, marginBottom: 12 }}
										onClick={() => {
											popupState.close;
											setShowFormModalBerkas(true);
										}}>
										<Typography sx={{ fontSize: '14px' }} color="#2196F3">
											<FontAwesomeIcon style={{ marginRight: '20px' }} icon={faPen} />
											Ganti Nama Berkas
										</Typography>
									</MenuItem>
									<MenuItem style={{ marginTop: 12, marginBottom: 12 }} onClick={() => setOpen(true)} >
										<Typography sx={{ fontSize: '14px' }} color="#2196F3">
											<FontAwesomeIcon style={{ marginRight: '20px' }} icon={faDownload} />
											Unduh Berkas
										</Typography>
									</MenuItem>
									<MenuItem
										style={{ marginTop: 12, marginBottom: 12 }}
										onClick={() => setShowFormModalDetail(true)}>
										<Typography sx={{ fontSize: '14px' }} color="#2196F3">
											<FontAwesomeIcon style={{ marginRight: '20px' }} icon={faThLarge} />
											Lihat Detail
										</Typography>
									</MenuItem>
									<MenuItem
										style={{ marginTop: 12, marginBottom: 12 }}
										onClick={() => setShowDeleteModal(true)}>
										<Typography sx={{ fontSize: '14px' }} color="#2196F3">
											<FontAwesomeIcon style={{ marginRight: '20px' }} icon={faTrash} />
											Hapus Berkas
										</Typography>
									</MenuItem>
								</Menu>
							</>
						)}
					</PopupState>
				</div>
				<CardMedia
					component="img"
					alt="img-folder"
					height="124"
					image={imgVideo}
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						width: 134,
					}}
				/>
				<hr style={{ width: 135, alignItems: 'center', marginLeft: 30 }} />
				<CardContent style={{ paddingBottom: 8 }}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<FontAwesomeIcon style={{ marginRight: '20px', color: '#2196F3', fontSize: 25 }} icon={faTv} />
						<Typography style={{ fontSize: 14 }} gutterBottom variant="h6" component="div">
							{attachment.attachment_name}
						</Typography>
					</div>
					<Typography style={{ fontWeight: 500, fontSize: 10, color: '#9E9E9E', marginTop: 3 }} variant="body2">
						Lizards are a widesp
					</Typography>
				</CardContent>
			</Card>
			<Modal open={showFormModalBerkas} onClose={() => setShowFormModalBerkas(false)}>
				<ModalEditFile
					closeFunction={() => {
						setShowFormModalBerkas(false);
					}}
				/>
			</Modal>
			<ConfirmationModal
				show={showDeleteModal}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() => setShowDeleteModal(false)}
				onSecondaryButtonClick={() => setShowDeleteModal(false)}
				title="Hapus Berkas?"
				image={'/image/quiz-delete.png'}
				confirmationText="Apakah Anda yakin ingin menghapus berkas ini?"
			/>
			<Modal open={showFormModalDetail} onClose={() => setShowFormModalDetail(false)}>
				<ModalDetail attachment={attachment} />
			</Modal>
			<Snackbar
				autoHideDuration={5000}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<Alert severity="info" variant="filled" icon={false} onClose={handleClose}>Berkas di Unduh</Alert>
			</Snackbar>
		</>
	);
};

export default CardFile;