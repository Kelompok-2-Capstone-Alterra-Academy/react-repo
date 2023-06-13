import styles from '../ModalDetail/ModalDetail.module.css';
import data from '../ModalDetail/test.pdf';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const ModalDetail = () => {
	const docs = [{ uri: data }];
	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Detail File Modul</span>
			<div className={styles.content}>
				<DocViewer
					style={{ width: 300, height: 300 }}
					documents={docs}
					initialActiveDocument={docs[1]}
					pluginRenderers={DocViewerRenderers}
					config={{ header: { disableFileName: true } }}
				/>
				<table className={styles.table}>
					<tr>
						<td className={styles.title}>judul</td>
						<td className={styles.value}>KPK.doc</td>
					</tr>
					<tr>
						<td className={styles.title}>Tanggal Unggah</td>
						<td className={styles.value}>28 April 2023, 13.00 WIB</td>
					</tr>
					<tr>
						<td className={styles.title}>Ukuran Berkas</td>
						<td className={styles.value}>67 kb</td>
					</tr>
					<tr>
						<td className={styles.title}>Tipe</td>
						<td className={styles.value}>Dokument</td>
					</tr>
					<tr>
						<td className={styles.title}>Dibuka</td>
						<td className={styles.value}>29 April 2023, 09.00 WIB</td>
					</tr>
				</table>
			</div>
		</div>
	);
};

export default ModalDetail;
