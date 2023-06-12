import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faFileLines } from '@fortawesome/free-solid-svg-icons';
import styles from "../ModalUploadFile/ModalUploadFile.module.css"
import Box from '@mui/material/Box';
import { Button } from '../../../components';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';

const ModalUploadFile = () => {
    const [file, setFile] = useState(null);

    function uploadFile(e) {
        let file = e.target.files[0];

        setFile(file)
        console.log(file)
    }
    return (
        <div className={styles.container}>
            <span className={styles.headerTitle}>Unggah Berkas Modul</span>
            <span className={styles.headerText}>Silahkan Unggah Berkas Modul Anda</span>
            {file === null ? <div className={styles.content}>
                <div className={styles.rounded}>
                    <FontAwesomeIcon className={styles.icon} icon={faArrowUpFromBracket} />
                </div>
                <span className={styles.textInformation}>Seret dan lepas berkas anda disini</span>
                <label htmlFor="inputTag">
                    <span className={styles.inputFile}>Pilih Berkas</span>
                    <input id="inputTag" type="file" onChange={(e) => uploadFile(e)} />
                </label>
                <span className={styles.textProvision}>Anda bisa unggah .PDF .DOC .XML .MP3 .MP4</span>
            </div> : <div className={styles.progress}>
                <span className={styles.title}>Sedang diunggah</span>
                <Box sx={{ width: '100%', height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '2px solid #f5f5f5', marginBottom: '20px' }}>
                        <FontAwesomeIcon icon={faFileLines} style={{
                            marginLeft: 15, color: "#2196F3",
                            fontSize: 20
                        }} />
                        <Box sx={{ width: '100%', m: 3 }}>
                            <div className={styles.textInfo}>
                                <span className={styles.nameInfo}>Perkalian.doc</span>
                                <span className={styles.sizeInfo}>23 kb/ 23 kb (3 menit lagi)</span>
                                <span className={styles.removeFile}>Batal</span>
                            </div>
                            <LinearProgress variant="determinate" style={{ height: '7px', borderRadius: 5, color: "black" }} value='50' />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '2px solid #f5f5f5' }}>
                        <FontAwesomeIcon icon={faFileLines} style={{
                            marginLeft: 15, color: "#2196F3",
                            fontSize: 20
                        }} />
                        <Box sx={{ width: '100%', m: 3 }}>
                            <div className={styles.textInfo}>
                                <span className={styles.nameInfo}>Perkalian.doc</span>
                                <span className={styles.sizeInfo}>23 kb/ 23 kb (3 menit lagi)</span>
                                <span className={styles.removeFile}>Batal</span>
                            </div>
                            <LinearProgress variant="determinate" style={{ height: '7px', borderRadius: 5, color: "black" }} value='50' />
                        </Box>
                    </Box>
                </Box>
                <div className={styles.actions}>
                    <label htmlFor="inputTag">
                        <span className={styles.inputAddFile}>Tambah Berkas</span>
                        <input id="inputTag" type="file" />
                    </label>
                    <div className={styles.actionFile}>
                        <Button className={styles.button} type='Secondary'>Batal</Button>
                        <Button className={styles.button} type='Primary'>Simpan</Button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ModalUploadFile