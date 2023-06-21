import AxiosInstances from 'axios';

function getCookieValue(cookieName) {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(`${cookieName}=`)) {
			return cookie.substring(cookieName.length + 1) ?? '';
		}
	}
	return '';
}

const token = getCookieValue('token');

const axios = AxiosInstances.create({
	baseURL: 'http://3.26.234.145:8081/',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const USER_PREFIX = 'mentors/user';
export const AUTH_PREFIX = 'mentors';
export const COURSE_PREFIX = 'mentors/courses';
export const DASHBOARD_PREFIX = 'mentors/dashboard';
export const CUSTOMER_PREFIX = 'mentors/courses/users';
export const QUIZ_PREFIX = 'mentors/quiz';
export const CHAT_PREFIX = 'mentors/chat';
export const ATTACHMENT_PREFIX = 'mentors/attachment';
export const FOLDER_PREFIX = 'mentors/folders';
export const SECTION_PREFIX = 'mentors/section';
export const MODULE_PREFIX = 'mentors/module';
export const TASK_PREFIX = 'mentors/task';
export const CLASS_PREFIX = 'mentors/classes';
export const MAJOR_PREFIX = 'mentors/majors';

export default axios;
