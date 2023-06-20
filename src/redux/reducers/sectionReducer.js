const initialState = {
	section: [],
	content: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const sectionReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_SECTION':
			return {
				...state,
				section: payload,
			};

		case 'ADD_SECTION':
			return {
				...state,
				section: [...state.section, payload],
			};

		case 'UPDATE_SECTION':
			return {
				...state,
				section: state.section.map((sec) => (sec.ID == payload.ID ? payload : sec)),
			};

		case 'DELETE_SECTION':
			return {
				...state,
				section: state.section.filter((sec) => sec.ID != payload),
			};

		case 'SET_CONTENT':
			return {
				...state,
				content: payload,
			};

		case 'ADD_CONTENT':
			return {
				...state,
				content: [...state.content, payload],
			};

		case 'UPDATE_CONTENT':
			return {
				...state,
				content: state.content.map((cont) => (cont.ID == payload.ID ? payload : cont)),
			};

		case 'DELETE_CONTENT':
			return {
				...state,
				content: state.content.filter((cont) => cont.ID != payload),
			};

		default:
			return state;
	}
};

export default sectionReducer;
