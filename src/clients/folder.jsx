import axios, { FOLDER_PREFIX } from './axios';

export function createFolder(data) {
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

export function updateFolder(data, id) {
	return axios({
		method: 'put',
		url: `${FOLDER_PREFIX}/${id}`,
		data: data,
	});
}

export function deleteFolder(id) {
	return axios({
		method: 'delete',
		url: `${FOLDER_PREFIX}/${id}`,
	});
}
