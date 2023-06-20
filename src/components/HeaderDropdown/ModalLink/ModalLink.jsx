import { useEffect, useState } from 'react';
import styles from '../ModalLink/ModalLink.module.css';
import { Button } from '../../../components';
import { toast } from 'react-toastify';
import { postAttachment } from '../../../clients';
import { addAttachment } from '../../../redux/actions/attachmentActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { faCheckCircle, faRotateRight, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalLink = ({ closeFunction }) => {
	const [link, setLink] = useState('');
	const [attachment, setAttachment] = useState('');

	const { id } = useParams();
	const dispatch = useDispatch();

	const [formValidation, setFormValidation] = useState(false);
	const [isCheckingGForm, setIsCheckingGForm] = useState(false);
	const [checkingGFormLoading, setCheckingGFormLoading] = useState(false);
	const [isValidGForm, setIsValidGForm] = useState(false);

	useEffect(() => {
		if (link !== '' && isValidGForm) {
			setFormValidation(true);
		} else {
			setFormValidation(false);
		}
	}, [link, isValidGForm]);

	const checkGFormExistence = (url) => {
		const regex =
			/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?(?=.*v=([\w-]+))(?:\S+)?|([\w-]+))/;
		const isValidURL = regex.test(url);
		return isValidURL;
	};

	const handleClickCheckingGForm = () => {
		setCheckingGFormLoading(true);

		setTimeout(() => {
			setCheckingGFormLoading(false);
			setIsCheckingGForm(true);
			setIsValidGForm(checkGFormExistence(link));
		}, 1000);
	};
	console.log(link)
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
					<div className={styles.gFormInput}>
						<input
							required
							className={styles.formInput}
							type="text"
							placeholder="Link Video"
							value={link}
							onChange={(e) => {
								setLink(e.target.value);
								setIsValidGForm(false);
								setIsCheckingGForm(false);
							}}
						/>
						<div className={styles.checkingIconContainer}>
							{!isCheckingGForm && !checkingGFormLoading && (
								<FontAwesomeIcon
									icon={faRotateRight}
									className={styles.checkingIcon}
									onClick={handleClickCheckingGForm}
								/>
							)}
							{!isCheckingGForm && checkingGFormLoading && (
								<FontAwesomeIcon icon={faRotateRight} className={styles.checkingIcon} spin />
							)}

							{!isValidGForm && isCheckingGForm && (
								<FontAwesomeIcon icon={faXmarkCircle} className={styles.checkingErrorIcon} />
							)}
							{isValidGForm && isCheckingGForm && (
								<FontAwesomeIcon icon={faCheckCircle} className={styles.checkingSuccessIcon} />
							)}
						</div>
					</div>
				</form>
			</div>
			<div className={styles.footer}>
				<Button
					type="Danger"
					onClick={() => {
						setLink('');
						closeFunction();
					}}>
					Batal
				</Button>
				<Button
					onClick={() => {
						if (link === "" && attachment === "") {
							toast.error('Field Tidak Boleh Kosong', {
								position: toast.POSITION.TOP_RIGHT
							});
						} else {
							postAttachment({
								attachment_name: attachment,
								attachment_source: `https://www.youtube.com/embed/${link.substring(32)}`,
								folder_id: id
							})
								.then((res) => {
									dispatch(addAttachment(res.data.data));
									window.location.reload();
								})
								.catch((err) => {
									toast.error(err.response.data.message, {
										position: toast.POSITION.TOP_RIGHT,
									});
								});
							setLink('');
						}
					}}
					type={formValidation ? 'Primary' : 'Disabled'}>Simpan</Button>
			</div>
		</div>
	);
};

export default ModalLink;
