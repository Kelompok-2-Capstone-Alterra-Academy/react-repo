import { combineReducers } from 'redux';
import attachmentReducer from './attachmentReducer';
import courseReducer from './courseReducer';
import customerReducer from './customerReducer';
import folderReducer from './folderReducer';
import quizReducer from './quizReducer';
import sectionReducer from './sectionReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
	section: sectionReducer,
	course: courseReducer,
	quiz: quizReducer,
	folder: folderReducer,
	attachment: attachmentReducer,
	customer: customerReducer,
	user: userReducer,
});
