const initialState = {
	attachment: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const attachmentReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newAttachment;
	let selectedAttachment;

	switch (type) {
		case 'SET_ATTACHMENT':
			return {
				...state,
				attachment: payload,
			};

		case 'ADD_ATTACHMENT':
			return {
				...state,
				attachment: [...state.attachment, payload],
			};

		case 'UPDATE_ATTACHMENT':
			selectedAttachment = state.attachment.find((attachment) => attachment.ID === payload.ID);
			newAttachment = {
				...selectedAttachment,
				...payload,
			};
			return {
				...state,
				attachment: state.attachment.map((attachment) => (attachment.ID === payload.ID ? newAttachment : attachment)),
			};

		case 'DELETE_ATTACHMENT':
			return {
				...state,
				attachment: state.attachment.filter((attachment) => attachment.ID !== payload),
			};

		default:
			return state;
	}
};

export default attachmentReducer;
