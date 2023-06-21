export const setQuiz = (payload) => ({
	type: 'SET_QUIZ',
	payload,
});

export const addQuiz = (payload) => ({
	type: 'ADD_QUIZ',
	payload,
});

export const toggleStatusQuiz = (payload) => ({
	type: 'TOGGLE_STATUS_QUIZ',
	payload,
});

export const deleteQuiz = (payload) => ({
	type: 'DELETE_QUIZ',
	payload,
});
