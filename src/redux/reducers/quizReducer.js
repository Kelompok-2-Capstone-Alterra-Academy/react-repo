import { v4 as uuidv4 } from 'uuid';

const initialState = {
	quiz: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const sectionReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;
	let newQuiz;
	let selectedQuiz;

	switch (type) {
		case 'ADD_QUIZ':
			newQuiz = {
				id: uuidv4(),
				name: payload.name,
				link: payload.link,
				status: 'Draf',
			};
			return {
				...state,
				quiz: [...state.quiz, newQuiz],
			};

		case 'PUBLISH_QUIZ':
			selectedQuiz = state.quiz.find((quiz) => quiz.id === payload);
			newQuiz = {
				...selectedQuiz,
				status: 'Terbit',
			};
			return {
				...state,
				quiz: state.quiz.map((quiz) => (quiz.id === payload ? newQuiz : quiz)),
			};

		case 'DELETE_QUIZ':
			return {
				...state,
				quiz: state.quiz.filter((quiz) => quiz.id !== payload),
			};

		default:
			return state;
	}
};

export default sectionReducer;
