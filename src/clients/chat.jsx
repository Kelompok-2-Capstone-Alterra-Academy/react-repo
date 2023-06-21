import axios, { CHAT_PREFIX } from './axios';

export function getStudent(courseId) {
	return axios({
		method: 'get',
		url: `${CHAT_PREFIX}/students/${courseId}`,
	});
}

export function getChat() {
	return axios({
		method: 'get',
		url: `${CHAT_PREFIX}/courses`,
	});
}
