const initialState = {
	email: '',
	password: '',
	gender: '',
	name: '',
	role: '',
	status: '',
	class: '',
	phone_number: '',
	profile: '',
};

const defaultAction = {
	type: '',
	payload: null,
};

const folderReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_USER':
			return {
				...payload,
			};

		case 'UPDATE_USER':
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};

export default folderReducer;
