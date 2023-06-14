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
