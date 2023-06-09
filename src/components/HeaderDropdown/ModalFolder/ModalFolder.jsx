import { useState } from "react";
import styles from "../ModalFolder/ModalFolder.module.css"
import { Button } from "../../../components";

const ModalFolder = ({ closeFunction }) => {
    const [folder, setFolder] = useState('');
    return (
        <div className={styles.container}>
            <span className={styles.headerTitle}>Folder Baru</span>
            <div className={styles.content}>
                <form className={styles.form}>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Nama Folder Baru"
                        value={folder}
                        onChange={(e) => setFolder(e.target.value)}
                    />
                </form>
            </div>
            <div className={styles.footer}>
                <Button
                    type="Danger"
                    onClick={() => {
                        setFolder('');
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

export default ModalFolder