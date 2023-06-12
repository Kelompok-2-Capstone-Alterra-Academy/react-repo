import { useState } from "react";
import styles from "../ModalEditFile/ModalEditFile.module.css"
import { Button } from "../../../components";

const ModalEditFile = ({ closeFunction }) => {
    const [file, setFile] = useState('');
    return (
        <div className={styles.container}>
            <span className={styles.headerTitle}>Ubah Nama Berkas</span>
            <div className={styles.content}>
                <form className={styles.form}>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Nama Berkas"
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                    />
                </form>
            </div>
            <div className={styles.footer}>
                <Button
                    type="Danger"
                    onClick={() => {
                        setFile('');
                        closeFunction();
                    }}
                >
                    Batal
                </Button>
                <Button type='Primary'>Simpan</Button>
            </div>
        </div>
    )
}

export default ModalEditFile