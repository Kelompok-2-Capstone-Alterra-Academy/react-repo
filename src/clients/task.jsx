import axios, { TASK_PREFIX } from './axios';

export function postTask(data) {
	return axios({
		method: 'post',
		url: `${TASK_PREFIX}`,
		data: data,
	});
}

export function getTaskById(id) {
	return axios({
		method: 'get',
		url: `${TASK_PREFIX}/${id}`,
	});
}

export function putTask(data, id) {
	return axios({
		method: 'put',
		url: `${TASK_PREFIX}/${id}`,
		data: data,
	});
}

export function delTask(id) {
	return axios({
		method: 'delete',
		url: `${TASK_PREFIX}/${id}`,
	});
}
