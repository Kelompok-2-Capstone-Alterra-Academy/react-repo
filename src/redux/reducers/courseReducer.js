import { v4 as uuidv4 } from 'uuid';

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
		case 'ADD_COURSE':
			newCourse = {
				id: uuidv4(),
				name: payload.name,
				schedule: payload.schedule,
				thumbnail: payload.thumbnail,
				malePercentage: payload.malePercentage,
				femalePercentage: payload.femalePercentage,
				totalStudent: payload.totalStudent,
				totalSection: payload.totalSection,
				status: 'Draf',
			};
			return {
				...state,
				course: [...state.course, newCourse],
			};

		case 'UPDATE_COURSE':
			selectedCourse = state.course.find((course) => course.id === payload.id);
			newCourse = {
				...selectedCourse,
				...payload,
			};
			return {
				...state,
				course: state.course.map((course) => (course.id === payload.id ? newCourse : course)),
			};

		case 'DELETE_COURSE':
			return {
				...state,
				course: state.course.filter((course) => course.id !== payload.id),
			};

		default:
			return state;
	}
};

export default sectionReducer;
