import { useDispatch } from 'react-redux';
import { addContent, updateSection } from '../../../redux/actions/sectionActions';
import Content from '../Content/Content';
import Controller from '../Controller/Controller';

export default function Section({ section, content, onReset }) {
	const dispatch = useDispatch();
	return (
		<>
			<Controller
				data={section}
				onAddContent={(content) => {
					dispatch(
						addContent({
							sectionId: section.id,
							content: {
								type: content.type,
								title: content.title,
								content: content.content,
							},
						})
					);
				}}
				onReset={onReset}
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
			{Object.keys(content).length !== 0 && <Content key={content.id} data={content} />}
		</>
	);
}
