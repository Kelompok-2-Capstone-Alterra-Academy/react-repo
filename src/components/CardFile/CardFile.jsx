import {
	faEdit,
	faEllipsisH,
	faFileAlt,
	faListAlt,
	faQuestion,
	faTrashAlt,
	faTv,
	faVideoCamera,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { delAttachment } from '../../clients';
import { useClickOutside } from '../../hooks';
import { deleteAttachment } from '../../redux/actions/attachmentActions';
import { truncateString } from '../../utilities/string';
import { ConfirmationModal } from '../ConfirmationModal';
import Select from '../Select/Select';
import styles from './CardFile.module.css';
import ModalDetail from './ModalDetail/ModalDetail';
import ModalEditFile from './ModalEditFile/ModalEditFile';

const CardFile = ({ attachment }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showFormModalBerkas, setShowFormModalBerkas] = useState(false);
	const [showFormModalDetail, setShowFormModalDetail] = useState(false);
	const [isShowMoreSelect, setIsShowMoreSelect] = useState(false);

	const dispatch = useDispatch();

	const ref = useClickOutside(() => {
		setIsShowMoreSelect(false);
	});

	const renderOption = (id) => {
		const icon = [faEdit, faListAlt, faTrashAlt];
		const option = ['Ganti Nama Berkas', 'Lihat Detail', 'Hapus Berkas'];

		return (
			<>
				<FontAwesomeIcon icon={icon[id - 1]} className={styles.optionItemIcon} />
				<span>{option[id - 1]}</span>
			</>
		);
	};

	return (
		<>
			<div className={styles.card}>
				<div className={styles.moreIcon}>
					<FontAwesomeIcon
						icon={faEllipsisH}
						className={styles.icon}
						onClick={() => {
							setIsShowMoreSelect(!isShowMoreSelect);
						}}
						ref={ref}
					/>
					<Select
						isShow={isShowMoreSelect}
						className={styles.moreSelect}
						options={{
							title: 'Pilih Aksi',
							data: [
								{
									id: 1,
									option: renderOption(1),
								},
								{
									id: 2,
									option: renderOption(2),
								},
								{
									id: 3,
									option: renderOption(3),
								},
							],
						}}
						handleSelected={(id) => {
							if (id === 1) {
								setShowFormModalBerkas(true);
							} else if (id === 2) {
								setShowFormModalDetail(true);
							} else if (id === 3) {
								setShowDeleteModal(true);
							}
						}}
					/>
				</div>
				<div className={styles.content}>
					<FontAwesomeIcon
						icon={
							{
								video: faVideoCamera,
								document: faFileAlt,
								ppt: faTv,
								default: faQuestion,
							}[attachment.type || 'default']
						}
						className={styles.typeIcon}
					/>
					<span className={styles.attachmentName}>
						{attachment.attachment_name.length > 20
							? attachment.attachment_name.substring(0, 20) + '...'
							: attachment.attachment_name || `Untitled`}
					</span>
				</div>
				<hr className={styles.divider} />
				<div className={styles.footer}>
					<span className={styles.description}>
						{attachment.description ? truncateString(attachment.description, 100) : '-'}
					</span>
				</div>
			</div>
			<Modal open={showFormModalBerkas} onClose={() => setShowFormModalBerkas(false)}>
				<ModalEditFile
					closeFunction={() => {
						setShowFormModalBerkas(false);
					}}
					attachment={attachment}
				/>
			</Modal>
			<ConfirmationModal
				show={showDeleteModal}
				primaryButtonName="Hapus"
				secondaryButtonName="Batal"
				onPrimaryButtonClick={() =>
					delAttachment(attachment.ID)
						.then(() => {
							toast.success(`Successfully delete ${attachment.attachment_name}`, {
								position: toast.POSITION.TOP_RIGHT,
							});
							dispatch(deleteAttachment(attachment.ID));
							setShowDeleteModal(false);
						})
						.catch((err) => {
							toast.error(err.response.data.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						})
						.finally(() => {
							setShowDeleteModal(false);
						})
				}
				onSecondaryButtonClick={() => setShowDeleteModal(false)}
				title="Hapus Berkas?"
				image={'/image/quiz-delete.png'}
				confirmationText="Apakah Anda yakin ingin menghapus berkas ini?"
			/>
			<Modal open={showFormModalDetail} onClose={() => setShowFormModalDetail(false)}>
				<ModalDetail attachment={attachment} />
			</Modal>
		</>
	);
};

export default CardFile;
