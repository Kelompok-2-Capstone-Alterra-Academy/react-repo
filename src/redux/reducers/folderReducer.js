const initialState = {
	folder: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const folderReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newFolder;
	let selectedFolder;

	switch (type) {
		case 'SET_FOLDER':
			return {
				...state,
				folder: payload,
			};

		case 'ADD_FOLDER':
			return {
				...state,
				folder: [...state.folder, payload],
			};

		case 'UPDATE_FOLDER':
			console.log('payload', payload);
			selectedFolder = state.folder.find((folder) => folder.ID === payload.ID);
			newFolder = {
				...selectedFolder,
				...payload,
			};
			return {
				...state,
				folder: state.folder.map((folder) => (folder.ID === payload.ID ? newFolder : folder)),
			};

		case 'DELETE_FOLDER':
			return {
				...state,
				folder: state.folder.filter((folder) => folder.ID !== payload),
			};

		default:
			return state;
	}
};

export default folderReducer;
