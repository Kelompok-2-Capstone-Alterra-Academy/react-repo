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

<<<<<<< HEAD
export function delCourse(id) {
=======
export function deleteCourse(id) {
>>>>>>> d26bedf48e94ad07daece3400e0395719a08cbb8
	return axios({
		method: 'delete',
		url: `${COURSE_PREFIX}/${id}`,
	});
}
