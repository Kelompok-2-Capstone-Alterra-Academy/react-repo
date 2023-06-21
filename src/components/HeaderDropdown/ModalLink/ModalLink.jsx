import { faCheckCircle, faRotateRight, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { postAttachment } from '../../../clients';
import { Button } from '../../../components';
import { addAttachment } from '../../../redux/actions/attachmentActions';
import styles from '../ModalLink/ModalLink.module.css';

const ModalLink = ({ closeFunction, folderId }) => {
	const [link, setLink] = useState('');
	const [attachment, setAttachment] = useState('');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();

	const [formValidation, setFormValidation] = useState(false);
	const [isCheckingVideo, setIsCheckingVideo] = useState(false);
	const [checkingVideoLoading, setCheckingVideoLoading] = useState(false);
	const [isValidVideo, setIsValidVideo] = useState(false);

	useEffect(() => {
		if (attachment && link != '' && isValidVideo) {
			setFormValidation(true);
		} else {
			setFormValidation(false);
		}
	}, [attachment, link, isValidVideo]);

	const checkVideoExistence = (url) => {
		const regex =
			/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?(?=.*v=([\w-]+))(?:\S+)?|([\w-]+))/;
		const isValidURL = regex.test(url);
		return isValidURL;
	};

	const handleClickCheckingVideo = () => {
		setCheckingVideoLoading(true);

		setTimeout(() => {
			setCheckingVideoLoading(false);
			setIsCheckingVideo(true);
			setIsValidVideo(checkVideoExistence(link));
		}, 1000);
	};

	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Masukan Link Video</span>
			<div className={styles.content}>
				<form className={styles.form}>
					<input
						required
						className={styles.formInput}
						type="text"
						placeholder="Nama Attachment"
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
							placeholder="Link Video"
							value={link}
							onChange={(e) => {
								setLink(e.target.value);
								setIsValidVideo(false);
								setIsCheckingVideo(false);
							}}
						/>
						<div className={styles.checkingIconContainer}>
							{!isCheckingVideo && !checkingVideoLoading && (
								<FontAwesomeIcon
									icon={faRotateRight}
									className={styles.checkingIcon}
									onClick={handleClickCheckingVideo}
								/>
							)}
							{!isCheckingVideo && checkingVideoLoading && (
								<FontAwesomeIcon icon={faRotateRight} className={styles.checkingIcon} spin />
							)}

							{!isValidVideo && isCheckingVideo && (
								<FontAwesomeIcon icon={faXmarkCircle} className={styles.checkingErrorIcon} />
							)}
							{isValidVideo && isCheckingVideo && (
								<FontAwesomeIcon icon={faCheckCircle} className={styles.checkingSuccessIcon} />
							)}
						</div>
					</div>
				</form>
			</div>
			<div className={styles.footer}>
				<Button
					type="Secondary"
					onClick={() => {
						setLink('');
						setAttachment('');
						setDescription('');
						setIsValidVideo(false);
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
								type: 'video',
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
									setIsValidVideo(false);
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

export default ModalLink;
