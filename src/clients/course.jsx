import axios, { COURSE_PREFIX } from './axios';

export function createCourse(data) {
	return axios({
		method: 'post',
		url: `${COURSE_PREFIX}/create`,
		data: data,
	});
}

export function getCourse() {
	return axios({
		method: 'get',
		url: `${COURSE_PREFIX}/my`,
	});
}
