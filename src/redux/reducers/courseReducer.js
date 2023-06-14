const initialState = {
	course: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const sectionReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newCourse;
	let selectedCourse;

	switch (type) {
		case 'SET_COURSE':
			return {
				...state,
				course: payload,
			};

		case 'ADD_COURSE':
			return {
				...state,
				course: [...state.course, payload],
			};

		case 'UPDATE_COURSE':
			console.log('payload', payload);
			selectedCourse = state.course.find((course) => course.ID === payload.ID);
			newCourse = {
				...selectedCourse,
				...payload,
			};
			return {
				...state,
				course: state.course.map((course) => (course.ID === payload.ID ? newCourse : course)),
			};

		case 'DELETE_COURSE':
			return {
				...state,
				course: state.course.filter((course) => course.ID !== payload),
			};

		default:
			return state;
	}
};

export default sectionReducer;
