import axios, { MODULE_PREFIX } from './axios';

export function createModule(data) {
	return axios({
		method: 'post',
		url: `${MODULE_PREFIX}`,
		data: data,
	});
}

export function getModuleById(id) {
	return axios({
		method: 'get',
		url: `${MODULE_PREFIX}/${id}`,
	});
}

export function updateModule(data, id) {
	return axios({
		method: 'put',
		url: `${MODULE_PREFIX}/${id}`,
		data: data,
	});
}

export function deleteModule(id) {
	return axios({
		method: 'delete',
		url: `${MODULE_PREFIX}/${id}`,
	});
}
