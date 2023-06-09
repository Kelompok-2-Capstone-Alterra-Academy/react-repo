import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import quizReducer from './quizReducer';
import sectionReducer from './sectionReducer';

export const rootReducer = combineReducers({
	section: sectionReducer,
	course: courseReducer,
	quiz: quizReducer,
});
