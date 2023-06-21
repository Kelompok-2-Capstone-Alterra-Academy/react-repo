const initialState = {
	customer: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const customerReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newCustomer;
	let selectedCustomer;

	switch (type) {
		case 'SET_CUSTOMER':
			return {
				...state,
				customer: payload,
			};

		case 'ADD_CUSTOMER':
			return {
				...state,
				customer: [...state.customer, payload],
			};

		case 'UPDATE_CUSTOMER':
			selectedCustomer = state.customer.find((customer) => customer.ID === payload.ID);
			newCustomer = {
				...selectedCustomer,
				...payload,
			};
			return {
				...state,
				customer: state.customer.map((customer) => (customer.ID === payload.ID ? newCustomer : customer)),
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
