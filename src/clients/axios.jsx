import AxiosInstances from 'axios';

const axios = AxiosInstances.create({
	baseURL: 'https://baseURL', //TODO change baseURL
	headers: {
		'Content-Type': 'application/json',
		Bearer: 'Bearer', //TODO change Bearer
	},
});

export const DASHBOARD_PREFIX = '/dashboard';
export const AUTH_PREFIX = '/auth';
export const SISWA_PREFIX = '/siswa';
export const NILAI_PREFIX = '/nilai';
export const CHAT_PREFIX = '/chat';
export const QUIZ_PREFIX = '/quiz';
export const COURSE_PREFIX = '/course';
export const LEARNING_MODUL_PREFIX = '/learning-modul';
export const PROFILE_PREFIX = '/profile';
export const INCOME_PREFIX = '/income';

export default axios;
