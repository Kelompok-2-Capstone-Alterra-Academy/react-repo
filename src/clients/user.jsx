import axios, { USER_PREFIX } from './axios';

export function getUser(id) {
	return axios({
		method: 'get',
		url: `${USER_PREFIX}s/${id}`,
	});
}

export function putUser({ id, data }) {
	return axios({
		method: 'put',
		url: `${USER_PREFIX}/profile/${id}`,
		data,
	});
}
