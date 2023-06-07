import AxiosInstances from 'axios';

const axios = AxiosInstances.create({
	baseURL: 'https://baseURL', //TODO change baseURL
	headers: {
		'Content-Type': 'application/json',
		Bearer: 'Bearer', //TODO change Bearer
	},
});

export const AUTH_PREFIX = '/mentors';
export const COURSE_PREFIX = '/mentors/course';
export const DASHBOARD_PREFIX = '/mentors/dashboard';
export const CUSTOMER_PREFIX = '/mentors/my-customer';
export const QUIZ_PREFIX = '/mentors/quiz';
export const CHAT_PREFIX = '/mentors/chat';

export default axios;
