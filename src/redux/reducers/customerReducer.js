const initialState = {
	customer: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const customerReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_CUSTOMER':
			return {
				...state,
				customer: payload,
			};

		case 'DELETE_CUSTOMER':
			return {
				...state,
				customer: state.customer.filter((customer) => customer.ID !== payload),
			};

		default:
			return state;
	}
};

export default customerReducer;
