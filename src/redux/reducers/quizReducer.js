const initialState = {
	quiz: [],
};

const defaultAction = {
	type: '',
	payload: null,
};

const sectionReducer = (state = initialState, action = defaultAction) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_QUIZ':
			return {
				...state,
				quiz: payload,
			};

		case 'ADD_QUIZ':
			return {
				...state,
				quiz: [...state.quiz, payload],
			};

		case 'TOGGLE_STATUS_QUIZ':
			return {
				...state,
				quiz: state.quiz.map((quiz) =>
					quiz.ID === payload
						? {
								...quiz,
								status: quiz.status == 'draft' ? 'terbit' : 'draft',
						  }
						: quiz
				),
			};

		case 'DELETE_QUIZ':
			return {
				...state,
				quiz: state.quiz.filter((quiz) => quiz.ID !== payload),
			};

		default:
			return state;
	}
};

export default sectionReducer;
