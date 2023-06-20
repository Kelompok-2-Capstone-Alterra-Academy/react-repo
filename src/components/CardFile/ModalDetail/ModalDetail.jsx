import styles from '../ModalDetail/ModalDetail.module.css';
import data from '../ModalDetail/test.pdf';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const ModalDetail = ({ attachment }) => {
	const docs = [{ uri: 'https://example.com/documents/document.pdf' }];
	return (
		<div className={styles.container}>
			<span className={styles.headerTitle}>Detail File Modul</span>
			<div className={styles.content}>
				{attachment.attachment_source.substring(0, 23) == "https://www.youtube.com" ? <iframe style={{ width: 400, height: 250 }} src={attachment.attachment_source} /> : <DocViewer
					style={{ width: 300, height: 300 }}
					documents={docs}
					initialActiveDocument={docs[1]}
					pluginRenderers={DocViewerRenderers}
					config={{ header: { disableFileName: true } }}
				/>}
				<table className={styles.table}>
					<tr>
						<td className={styles.title}>judul</td>
						<td className={styles.value}>{attachment.attachment_name}</td>
					</tr>
					<tr>
						<td className={styles.title}>Tanggal Unggah</td>
						<td className={styles.value}>{attachment.CreatedAt.substring(0, 10)}</td>
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
