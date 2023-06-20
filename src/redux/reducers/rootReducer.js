import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import quizReducer from './quizReducer';
import sectionReducer from './sectionReducer';
import folderReducer from './folderReducer';
import attachmentReducer from './attachmentReducer';
import customerReducer from './customerReducer';


export const rootReducer = combineReducers({
	section: sectionReducer,
	course: courseReducer,
	quiz: quizReducer,
	folder: folderReducer,
	attachment: attachmentReducer,
	customer: customerReducer

});
