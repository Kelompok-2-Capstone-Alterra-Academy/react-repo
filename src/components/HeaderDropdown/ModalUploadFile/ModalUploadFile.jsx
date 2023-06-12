import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from "../ModalUploadFile/ModalUploadFile.module.css"
import { Button } from '../../../components';

const ModalUploadFile = () => {
    return (
        <div className={styles.container}>
            <span className={styles.headerTitle}>Unggah Berkas Modul</span>
            <span className={styles.headerText}>Silahkan Unggah Berkas Modul Anda</span>
            <div className={styles.content}>
                <div className={styles.rounded}>
                    <FontAwesomeIcon className={styles.icon} icon={faArrowUpFromBracket} />
                </div>
                <span className={styles.textInformation}>Seret dan lepas berkas anda disini</span>
                <label htmlFor="inputTag">
                    <span className={styles.inputFile}>Pilih Berkas</span>
                    <input id="inputTag" type="file" />
                </label>
                <span className={styles.textProvision}>Anda bisa unggah .PDF .DOC .XML .MP3 .MP4</span>
            </div>
        </div>
    )
}

export default ModalUploadFile