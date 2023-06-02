import { useDispatch } from 'react-redux';
import { addContent, updateSection } from '../../../redux/actions/sectionActions';
import Content from '../Content/Content';
import Controller from '../Controller/Controller';

export default function Section({ section, content, onResetSection, onResetContent }) {
	const dispatch = useDispatch();
	return (
		<>
			<Controller
				data={section}
				onAddContent={(content) => {
					dispatch(
						addContent({
							sectionId: section.id,
							content: content,
						})
					);
				}}
				onResetSection={onResetSection}
				onSave={(newData) => {
					dispatch(
						updateSection({
							id: section.id,
							title: newData.title,
							sectionTitle: newData.sectionTitle,
							isDrillDown: section.isDrillDown,
							content: section.content,
						})
					);
				}}
			/>
			{Object.keys(content).length !== 0 && (
				<Content
					key={content.id}
					data={content}
					sectionId={section.id}
					onResetContent={onResetContent}
				/>
			)}
		</>
	);
}
