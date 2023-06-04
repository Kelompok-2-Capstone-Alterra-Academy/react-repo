import { useState } from "react";
import styles from "../FormModal/FormModal.module.css"
import { Button } from "../../components";

const FormModal = ({ closeFunction, header, placeholder }) => {
    const [contentForm, setContentForm] = useState('');
    return (
        <div className={styles.container}>
            <span className={styles.headerTitle}>{header}</span>
            <div className={styles.content}>
                <form className={styles.form}>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder={placeholder}
                        value={contentForm}
                        onChange={(e) => setContentForm(e.target.value)}
                    />
                </form>
            </div>
            <div className={styles.footer}>
                <Button
                    type="Danger"
                    onClick={() => {
                        setContentForm('');
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

export default FormModal