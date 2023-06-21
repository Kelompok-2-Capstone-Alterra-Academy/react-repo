import axios, { ATTACHMENT_PREFIX } from './axios';

export function getAttachment(id) {
	return axios({
		method: 'get',
		url: `${ATTACHMENT_PREFIX}/${id}`,
	});
}

export function postAttachment(data) {
	return axios({
		method: 'post',
		url: `${ATTACHMENT_PREFIX}`,
		data: data,
	});
}

export function putAttachment({ id, data }) {
	return axios({
		method: 'put',
		url: `${ATTACHMENT_PREFIX}/${id}`,
		data: data,
	});
}

export function delAttachment(id) {
	return axios({
		method: 'delete',
		url: `${ATTACHMENT_PREFIX}/${id}`,
	});
}

export function getQuiz() {
	return axios({
		method: 'get',
		url: `${ATTACHMENT_PREFIX}/quiz`,
	});
}
