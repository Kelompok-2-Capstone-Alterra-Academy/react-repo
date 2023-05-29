import { Profile, Sidebar } from "../../components";
import BasicBreadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CardFile from "../../components/CardFile/CardFile";
import CardFolder from "../../components/CardFolder/CardFolder";
import HeaderDropdown from "../../components/HeaderDropdown/HeaderDropdown";
import styles from "../LearningModule/Learning.module.css"
import ava from "../../../public/image/ava.jpg"
import Grid from '@mui/material/Grid';



function LearningModule() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div style={{ display: 'flex' }}>
                    <BasicBreadcrumbs name="Modul" link1="Dashboard" link2="Pembelajaran" />
                    <Profile name="Jennie BP" pic={ava} email="jennieblpk20@email.com" />
                </div>
                <HeaderDropdown />
                <CardFolder />
                <CardFile />
            </div>
        </div>
    );
}

export default LearningModule;