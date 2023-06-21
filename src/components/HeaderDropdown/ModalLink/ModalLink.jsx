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
			<span className={styles.headerTitle}>Form Upload Video</span>
			<div className={styles.content}>
				<form className={styles.form}>
					<div className={styles.formGroup}>
						<span className={styles.label}>Nama Video</span>
						<input
							required
							className={styles.input}
							type="text"
							placeholder="Masukkan Nama Video"
							value={attachment}
							onChange={(e) => setAttachment(e.target.value)}
						/>
					</div>
					<div className={styles.formGroup}>
						<span className={styles.label}>Deskripsi Video</span>
						<textarea
							className={styles.input}
							placeholder="Masukkan Deskripsi Video"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className={styles.formGroup}>
						<span className={styles.label}>Link Video</span>
						<div className={styles.inputCheckingContainer}>
							<input
								required
								className={styles.inputChecking}
								type="text"
								placeholder="Masukkan Link Video"
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
							})
								.then((res) => {
									toast.success(res.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
									dispatch(addAttachment(res.data.data.attachment));
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
