import { useState } from "react";
import styles from "../ModalFolder/ModalFolder.module.css"
import { Button } from "../../../components";
import { toast } from 'react-toastify';
import { postFolder } from '../../../clients';
import { addFolder } from '../../../redux/actions/folderActions';
import { useDispatch } from 'react-redux';

const ModalFolder = ({ closeFunction }) => {
    const [folder, setFolder] = useState('');
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <span className={styles.headerTitle}>Folder Baru</span>
            <div className={styles.content}>
                <form className={styles.form}>
                    <input
                        required
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
                <Button
                    onClick={() => {
                        if (folder === "") {
                            toast.error('Field Folder Tidak Boleh Kosong', {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        } else {
                            postFolder({
                                folder_name: folder,
                            })
                                .then((res) => {
                                    dispatch(addFolder(res.data.data));
                                    window.location.reload();
                                })
                                .catch((err) => {
                                    toast.error(err.response.data.message, {
                                        position: toast.POSITION.TOP_RIGHT,
                                    });
                                });
                            setFolder('');
                        }
                        // window.location.reload();
                    }} type='Primary'>Simpan</Button>
            </div>
        </div>
    )
}

export default ModalFolder