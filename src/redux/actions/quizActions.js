export const addQuiz = (payload) => ({
	type: 'ADD_QUIZ',
	payload,
});

export const publishQuiz = (payload) => ({
	type: 'PUBLISH_QUIZ',
	payload,
});

export const deleteQuiz = (payload) => ({
	type: 'DELETE_QUIZ',
	payload,
});
