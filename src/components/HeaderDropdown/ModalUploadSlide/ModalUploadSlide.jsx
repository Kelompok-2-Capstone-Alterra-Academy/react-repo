import { faCheckCircle, faRotateRight, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '../..';
import { postAttachment } from '../../../clients';
import { addAttachment } from '../../../redux/actions/attachmentActions';
import styles from '../ModalUploadSlide/ModalUploadSlide.module.css';

const ModalUploadSlide = ({ closeFunction, folderId }) => {
	const [link, setLink] = useState('');
	const [attachment, setAttachment] = useState('');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();

	const [formValidation, setFormValidation] = useState(false);
	const [isCheckingSlide, setIsCheckingSlide] = useState(false);
	const [checkingSlideLoading, setCheckingSlideLoading] = useState(false);
	const [isValidSlide, setIsValidSlide] = useState(false);

	useEffect(() => {
		if (link !== '' && isValidSlide) {
			setFormValidation(true);
		} else {
			setFormValidation(false);
		}
	}, [link, isValidSlide]);

	const checkSlideExistence = (url) => {
		const regex = /https?:\/\/(?:docs)\.google\.com\/(?:presentation)\/d\/([a-zA-Z0-9-_]+)/i;
		const isValidURL = regex.test(url);
		return isValidURL;
	};

	const handleClickCheckingSlide = () => {
		setCheckingSlideLoading(true);

		setTimeout(() => {
			setCheckingSlideLoading(false);
			setIsCheckingSlide(true);
			setIsValidSlide(checkSlideExistence(link));
		}, 1000);
	};

	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Form Upload PPT</span>
			<div className={styles.content}>
				<div className={styles.formGroup}>
					<span className={styles.label}>Nama PPT</span>
					<input
						required
						className={styles.input}
						type="text"
						placeholder="Masukkan Nama PPT"
						value={attachment}
						onChange={(e) => setAttachment(e.target.value)}
					/>
				</div>
				<div className={styles.formGroup}>
					<span className={styles.label}>Deskripsi PPT</span>
					<textarea
						className={styles.input}
						placeholder="Masukkan Deskripsi PPT"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className={styles.formGroup}>
					<span className={styles.label}>Link PPT</span>
					<div className={styles.inputCheckingContainer}>
						<input
							required
							className={styles.inputChecking}
							type="text"
							placeholder="Masukkan Link PPT"
							value={link}
							onChange={(e) => {
								setLink(e.target.value);
								setIsValidSlide(false);
								setIsCheckingSlide(false);
							}}
						/>
						<div className={styles.checkingIconContainer}>
							{!isCheckingSlide && !checkingSlideLoading && (
								<FontAwesomeIcon
									icon={faRotateRight}
									className={styles.checkingIcon}
									onClick={handleClickCheckingSlide}
								/>
							)}
							{!isCheckingSlide && checkingSlideLoading && (
								<FontAwesomeIcon icon={faRotateRight} className={styles.checkingIcon} spin />
							)}

							{!isValidSlide && isCheckingSlide && (
								<FontAwesomeIcon icon={faXmarkCircle} className={styles.checkingErrorIcon} />
							)}
							{isValidSlide && isCheckingSlide && (
								<FontAwesomeIcon icon={faCheckCircle} className={styles.checkingSuccessIcon} />
							)}
						</div>
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
						setIsValidSlide(false);
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
								type: 'ppt',
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
									setIsValidSlide(false);
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

export default ModalUploadSlide;
