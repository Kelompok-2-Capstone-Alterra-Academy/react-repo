import axios, { COURSE_PREFIX } from './axios';

export function createCourse(data) {
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

export function updateCourse(data, id) {
	return axios({
		method: 'put',
		url: `${COURSE_PREFIX}/${id}`,
		data: data,
	});
}

export function deleteCourse(id) {
	return axios({
		method: 'delete',
		url: `${COURSE_PREFIX}/${id}`,
	});
}
