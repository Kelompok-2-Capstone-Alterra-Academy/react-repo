import { v4 as uuidv4 } from 'uuid';

const initialState = {
	section: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const sectionReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newSection;
	let newContent;
	let selectedSection;
	let selectedContent;

	switch (type) {
		case 'ADD_SECTION':
			newSection = {
				id: uuidv4(),
				title: payload.title,
				sectionTitle: payload.sectionTitle,
				isDrillDown: payload.isDrillDown,
				content: [],
			};
			return {
				...state,
				section: [...state.section, newSection],
			};

		case 'UPDATE_SECTION':
			selectedSection = state.section.find((sec) => sec.id === payload.id);
			newSection = {
				...selectedSection,
				...payload,
			};
			return {
				...state,
				section: state.section.map((sec) => (sec.id === payload.id ? newSection : sec)),
			};

		case 'DELETE_SECTION':
			return {
				...state,
				section: state.section.filter((sec) => sec.id !== payload.id),
			};

		case 'ADD_CONTENT':
			selectedSection = state.section.find((sec) => sec.id === payload.sectionId);
			newContent = {
				id: uuidv4(),
				...payload.content,
			};
			newSection = {
				...selectedSection,
				content: [...selectedSection.content, newContent],
			};
			return {
				...state,
				section: state.section.map((sec) => (sec.id === payload.sectionId ? newSection : sec)),
			};

		case 'UPDATE_CONTENT':
			selectedSection = state.section.find((sec) => sec.id === payload.secctionid);
			selectedContent = selectedSection.content.find((cont) => cont.id === payload.content.id);
			newContent = {
				...selectedContent,
				...payload.content,
			};
			newSection = {
				...selectedSection,
				content: selectedSection.content.map((cont) =>
					cont.id === payload.content.id ? newContent : cont
				),
			};
			return {
				...state,
				section: state.section.map((sec) => (sec.id === payload.sectionId ? newSection : sec)),
			};

		case 'DELETE_CONTENT':
			selectedSection = state.section.find((sec) => sec.id === payload.sectionId);
			return {
				...state,
				section: state.section.map((sec) =>
					sec.id === payload.sectionId
						? {
								...sec,
								content: sec.content.filter((cont) => cont.id !== payload.contentId),
						  }
						: sec
				),
			};

		default:
			return state;
	}
};

export default sectionReducer;
