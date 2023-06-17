const initialState = {
	modul: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const modulReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newModul;
	let selectedModul;

	switch (type) {
		case 'SET_MODUL':
			return {
				...state,
				modul: payload,
			};

		case 'ADD_MODUL':
			return {
				...state,
				modul: [...state.modul, payload],
			};

		case 'UPDATE_MODUL':
			console.log('payload', payload);
			selectedModul = state.modul.find((modul) => modul.ID === payload.ID);
			newModul = {
				...selectedModul,
				...payload,
			};
			return {
				...state,
				modul: state.modul.map((modul) => (modul.ID === payload.ID ? newModul : modul)),
			};

		case 'DELETE_MODUL':
			return {
				...state,
				modul: state.modul.filter((modul) => modul.ID !== payload),
			};

		default:
			return state;
	}
};

export default modulReducer;
