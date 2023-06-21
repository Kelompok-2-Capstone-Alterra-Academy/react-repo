import { faCheckCircle, faRotateRight, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { postAttachment } from '../../../clients';
import { Button } from '../../../components';
import { addAttachment } from '../../../redux/actions/attachmentActions';
import styles from '../ModalUploadFile/ModalUploadFile.module.css';

const ModalUploadFile = ({ closeFunction, folderId }) => {
	const [link, setLink] = useState('');
	const [attachment, setAttachment] = useState('');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();

	const [formValidation, setFormValidation] = useState(false);
	const [isCheckingFile, setIsCheckingFile] = useState(false);
	const [checkingFileLoading, setCheckingFileLoading] = useState(false);
	const [isValidFile, setIsValidFile] = useState(false);

	useEffect(() => {
		if (link !== '' && isValidFile) {
			setFormValidation(true);
		} else {
			setFormValidation(false);
		}
	}, [link, isValidFile]);

	const checkFileExistence = (url) => {
		const regex =
			/https?:\/\/(?:docs|slides)\.google\.com\/(?:document|presentation)\/d\/([a-zA-Z0-9-_]+)/i;
		const isValidURL = regex.test(url);
		return isValidURL;
	};

	const handleClickCheckingFile = () => {
		setCheckingFileLoading(true);

		setTimeout(() => {
			setCheckingFileLoading(false);
			setIsCheckingFile(true);
			setIsValidFile(checkFileExistence(link));
		}, 1000);
	};

	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Masukan Link File</span>
			<div className={styles.content}>
				<input
					required
					className={styles.formInput}
					type="text"
					placeholder="Nama File"
					value={attachment}
					onChange={(e) => setAttachment(e.target.value)}
				/>
				<textarea
					className={styles.formInput}
					placeholder="Deskripsi File"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<div className={styles.gFormInput}>
					<input
						required
						className={styles.formInput}
						type="text"
						placeholder="Link File"
						value={link}
						onChange={(e) => {
							setLink(e.target.value);
							setIsValidFile(false);
							setIsCheckingFile(false);
						}}
					/>
					<div className={styles.checkingIconContainer}>
						{!isCheckingFile && !checkingFileLoading && (
							<FontAwesomeIcon
								icon={faRotateRight}
								className={styles.checkingIcon}
								onClick={handleClickCheckingFile}
							/>
						)}
						{!isCheckingFile && checkingFileLoading && (
							<FontAwesomeIcon icon={faRotateRight} className={styles.checkingIcon} spin />
						)}

						{!isValidFile && isCheckingFile && (
							<FontAwesomeIcon icon={faXmarkCircle} className={styles.checkingErrorIcon} />
						)}
						{isValidFile && isCheckingFile && (
							<FontAwesomeIcon icon={faCheckCircle} className={styles.checkingSuccessIcon} />
						)}
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<Button
					type="Secondary"
					onClick={() => {
						setLink('');
						setAttachment('');
						setDescription('');
						setIsValidFile(false);
						closeFunction();
					}}>
					Batal
				</Button>
				<Button
					onClick={() => {
						if (link === '' && attachment === '') {
							toast.error('Field Tidak Boleh Kosong', {
								position: toast.POSITION.TOP_RIGHT,
							});
						} else {
							postAttachment({
								attachment_name: attachment,
								attachment_source: link,
								description: description,
								folder_id: `${folderId}`,
								type: 'document',
								status: 'draft',
							})
								.then((res) => {
									toast.success(res.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									dispatch(addAttachment(res.data.data));
								})
								.catch((err) => {
									toast.error(err.response.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
								})
								.finally(() => {
									setLink('');
									setAttachment('');
									setDescription('');
									setIsValidFile(false);
									closeFunction();
								});
						}
					}}
					type={formValidation ? 'Primary' : 'Disabled'}>
					Simpan
				</Button>
			</div>
		</div>
	);
};

export default ModalUploadFile;
