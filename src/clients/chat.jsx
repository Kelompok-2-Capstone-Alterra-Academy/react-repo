import axios, { CHAT_PREFIX } from 'axios';

export function getStudent(params) {
	return axios({
		method: 'get',
		url: `${CHAT_PREFIX}/students/${params}`,
	});
}

export function getCourse() {
	return axios({
		method: 'get',
		url: `${CHAT_PREFIX}/courses`,
	});
}
