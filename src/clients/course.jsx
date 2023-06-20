import axios, { COURSE_PREFIX } from './axios';

export function postCourse(data) {
	return axios({
		method: 'post',
		url: `${COURSE_PREFIX}`,
		data: data,
	});
}

export function getCourse() {
	return axios({
		method: 'get',
		url: `${COURSE_PREFIX}`,
	});
}

export function putCourse({ data, id }) {
	return axios({
		method: 'put',
		url: `${COURSE_PREFIX}/${id}`,
		data: data,
	});
}

export function delCourse(id) {
	return axios({
		method: 'delete',
		url: `${COURSE_PREFIX}/${id}`,
	});
}

export function getStudentByCourse() {
	return axios({
		method: 'get',
		url: `${COURSE_PREFIX}`,
	});
}

export function delStudentCourse(id) {
	return axios({
		method: 'delete',
		url: `${COURSE_PREFIX}/${id}`,
	});
}
