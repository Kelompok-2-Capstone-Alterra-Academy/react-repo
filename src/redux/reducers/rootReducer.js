import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import quizReducer from './quizReducer';
import sectionReducer from './sectionReducer';
import folderReducer from './folderReducer';
import modulReducer from './modulReducer';

export const rootReducer = combineReducers({
	section: sectionReducer,
	course: courseReducer,
	quiz: quizReducer,
	folder: folderReducer,
	modul: modulReducer
});
