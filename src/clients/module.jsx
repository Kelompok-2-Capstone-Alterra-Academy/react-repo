import axios, { MODULE_PREFIX } from './axios';

export function postModule(data) {
	return axios({
		method: 'post',
		url: `${MODULE_PREFIX}`,
		data: data,
	});
}

export function getModule() {
	return axios({
		method: 'get',
		url: `${MODULE_PREFIX}`,
	});
}

export function putModule({ data, id }) {
	return axios({
		method: 'put',
		url: `${MODULE_PREFIX}/${id}`,
		data: data,
	});
}

export function delModule(id) {
	return axios({
		method: 'delete',
		url: `${MODULE_PREFIX}/${id}`,
	});
}
