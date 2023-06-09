import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
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
                <Button type="Secondary">Pilih Berkas</Button>
                <span className={styles.textProvision}>Anda bisa unggah .PDF .DOC .XML .MP3 .MP4</span>
            </div>
            <div className={styles.footer}>

                {/* <Button
                    type="Danger"
                    onClick={() => {
                        setContentForm('');
                        closeFunction();
                    }}
                >
                    Batal
                </Button>
                <Button type='Primary'>Simpan</Button> */}
            </div>
        </div>
    )
}

export default ModalUploadFile