import { combineReducers } from 'redux';
import sectionReducer from './sectionReducer';

export const rootReducer = combineReducers({
	section: sectionReducer,
});
