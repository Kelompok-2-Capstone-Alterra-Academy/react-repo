import axios, { FOLDER_PREFIX } from './axios';

export function postFolder(data) {
	return axios({
		method: 'post',
		url: `${FOLDER_PREFIX}`,
		data: data,
	});
}

export function getFolder() {
	return axios({
		method: 'get',
		url: `${FOLDER_PREFIX}`,
	});
}

export function putFolder(data, id) {
	return axios({
		method: 'put',
		url: `${FOLDER_PREFIX}/${id}`,
		data: data,
	});
}

export function delFolder(id) {
	return axios({
		method: 'delete',
		url: `${FOLDER_PREFIX}/${id}`,
	});
}
