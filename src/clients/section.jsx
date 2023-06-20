import axios, { SECTION_PREFIX } from './axios';

export function postSection(data) {
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

export function putSection({ data, id }) {
	return axios({
		method: 'put',
		url: `${SECTION_PREFIX}/${id}`,
		data: data,
	});
}

export function delSection(id) {
	return axios({
		method: 'delete',
		url: `${SECTION_PREFIX}/${id}`,
	});
}
