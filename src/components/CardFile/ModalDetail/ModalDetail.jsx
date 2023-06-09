import { FileViewer } from "react-file-viewer";
import styles from "../ModalDetail/ModalDetail.module.css"
import { Button } from '../../../components';
import data from "../../../../public/image/ava.jpg"

const ModalDetail = () => {
    const file = 'http://example.com/image.png';
    const type = 'png';
    return (
        <div className={styles.container}>
            <span className={styles.headerTitle}>Detail File Modul</span>
            <div className={styles.content}>
                {/* <FileViewer
                    fileType={type}
                    filePath={file} /> */}
            </div>
        </div>
    )
}

export default ModalDetail