import {
	faFileAlt,
	faFolderOpen,
	faPlus,
	faTvAlt,
	faVideoCamera,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Button, Select } from '../../components';
import { useClickOutside } from '../../hooks';
import styles from '../HeaderDropdown/HeaderDropdown.module.css';
import ModalFolder from './ModalFolder/ModalFolder';
import ModalLink from './ModalLink/ModalLink';
import ModalUploadFile from './ModalUploadFile/ModalUploadFile';
import ModalUploadSlide from './ModalUploadSlide/ModalUploadSlide';

const HeaderDropdown = ({ folderData, selectedId }) => {
	const [showFormModalFolder, setShowFormModalFolder] = useState(false);
	const [showFormModalLink, setShowFormModalLink] = useState(false);
	const [showFormModalFile, setShowFormModalFile] = useState(false);
	const [showFormModalSlide, setShowFormModalSlide] = useState(false);
	const [isShowActionSelect, setIsShowActionSelect] = useState(false);

	const ref = useClickOutside(() => {
		setIsShowActionSelect(false);
	});

	const renderOption = (id) => {
		const icon = [faFolderOpen, faFileAlt, faTvAlt, faVideoCamera];
		const option = ['Tambah Folder', 'Upload Document', 'Upload PPT', 'Upload Video'];

		return (
			<>
				<FontAwesomeIcon icon={icon[id - 1]} className={styles.optionItemIcon} />
				<span>{option[id - 1]}</span>
			</>
		);
	};

	const handleOption = (id) => {
		if (id) {
			return [
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
				{
					id: 4,
					option: renderOption(4),
				},
			];
		} else {
			return [
				{
					id: 1,
					option: renderOption(1),
				},
			];
		}
	};

	return (
		<>
			<div className={styles.header}>
				<span className={styles.headerTitle}>{folderData?.length} Folder</span>
				<div className={styles.buttonContainer} ref={ref}>
					<Button
						className={styles.headerButton}
						type="Primary"
						onClick={() => {
							setIsShowActionSelect(!isShowActionSelect);
						}}>
						<FontAwesomeIcon icon={faPlus} className={styles.headerButtonIcon} />
						Tambah Modul
					</Button>
					<Select
						isShow={isShowActionSelect}
						className={styles.actionSelect}
						options={{
							title: 'Pilih Aksi',
							data: handleOption(selectedId),
						}}
						handleSelected={(id) => {
							if (id == 1) {
								setShowFormModalFolder(true);
							} else if (id == 2) {
								setShowFormModalFile(true);
							} else if (id == 3) {
								setShowFormModalSlide(true);
							} else if (id == 4) {
								setShowFormModalLink(true);
							}
						}}
					/>
				</div>
			</div>
			<Modal open={showFormModalFolder} onClose={() => setShowFormModalFolder(false)}>
				<ModalFolder
					closeFunction={() => {
						setShowFormModalFolder(false);
					}}
				/>
			</Modal>
			<Modal open={showFormModalLink} onClose={() => setShowFormModalLink(false)}>
				<ModalLink
					closeFunction={() => {
						setShowFormModalLink(false);
					}}
					folderId={selectedId}
				/>
			</Modal>
			<Modal open={showFormModalFile} onClose={() => setShowFormModalFile(false)}>
				<ModalUploadFile
					closeFunction={() => {
						setShowFormModalFile(false);
					}}
					folderId={selectedId}
				/>
			</Modal>
			<Modal open={showFormModalSlide} onClose={() => setShowFormModalSlide(false)}>
				<ModalUploadSlide
					closeFunction={() => {
						setShowFormModalSlide(false);
					}}
					folderId={selectedId}
				/>
			</Modal>
		</>
	);
};

export default HeaderDropdown;
