import axios, { SECTION_PREFIX } from './axios';

export function createSection(data) {
	return axios({
		method: 'post',
		url: `${SECTION_PREFIX}`,
		data: data,
	});
}

export function getSection() {
	return axios({
		method: 'get',
		url: `${SECTION_PREFIX}`,
	});
}

export function updateSection(data, id) {
	return axios({
		method: 'put',
		url: `${SECTION_PREFIX}/${id}`,
		data: data,
	});
}

export function deleteSection(id) {
	return axios({
		method: 'delete',
		url: `${SECTION_PREFIX}/${id}`,
	});
}
